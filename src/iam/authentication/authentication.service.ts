import { User } from '@app/user/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../hashing';
import { SignInDto, SignUpDto } from './dto';
import jwtConfig from '@app/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return accessToken;
  }
}
