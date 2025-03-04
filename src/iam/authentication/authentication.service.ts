import { User } from '@app/user/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../hashing';
import { SignInDto, SignUpDto } from './dto';
import jwtConfig from '@app/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { v4 } from 'uuid';
import { RefreshTokenPayload } from '../interfaces/refresh-token-payload.interface';
import { RefreshTokenIdsStorage } from './storage/refresh-token-ids.storage';
import { InvalidatedRefreshTokenError } from '../errors/invalidate-refresh-token.error';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = new User()
    user.email = signUpDto.email;
    user.password = await this.hashingService.hash(signUpDto.password);
    await this.em.persistAndFlush(user);
    return user;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({ email: signInDto.email })

    if (!user) throw new UnauthorizedException('(1) Username or password does not exist!');

    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isEqual) throw new UnauthorizedException('(2) Username or password does not exist!');

    return await this.generateTokens(user);
  }
  
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
      Pick<ActiveUserData, 'sub'> & RefreshTokenPayload
    >(refreshTokenDto.refreshToken, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });

    const user = await this.userRepository.findOneOrFail({
      id: sub,
    });

    const isValid = await this.refreshTokenIdsStorage.validate(
      user.id,
      refreshTokenId,
    );
    if (isValid) {
      try {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } catch (err) {
        if (err instanceof InvalidatedRefreshTokenError) {
          throw new UnauthorizedException('Access denied');
        }
        throw err;
      }
    } else {
      throw new UnauthorizedException('Refresh token is invalid');
    }
    return await this.generateTokens(user);
  }
  
  private async signToken<T>(userId: string, expiresIn: number, payload?: T): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    )
  }

  async generateTokens(user: User) {
    const refreshTokenId = v4()
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id, 
        this.jwtConfiguration.refreshTokenTtl, 
        { email: user.email, role: user.role, permissions: user.permissions },
      ),
      this.signToken<RefreshTokenPayload>(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);

    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);

    return {accessToken, refreshToken};
  }

  getAccessTokenTtl(): number {
    return this.jwtConfiguration.accessTokenTtl;
  }

  getRefreshTokenTtl(): number {
    return this.jwtConfiguration.refreshTokenTtl;
  }
}
