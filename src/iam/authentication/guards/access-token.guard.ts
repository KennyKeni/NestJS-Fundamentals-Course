import jwtConfig from '@app/config/jwt.config';
import { REQUEST_USER_KEY } from '@app/iam/iam.constants';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify/types/request';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    let token = this.extractTokenFromCookie(request) || this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Invalid or missing token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      )
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException("Invalid or missing token");
    }
    return true;
  }

  private extractTokenFromCookie(request: FastifyRequest): string | undefined {
    const token = request.cookies['accessToken'];
    return token;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
