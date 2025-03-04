import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto';
import { FastifyReply } from 'fastify';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Res({ passthrough: true }) response: FastifyReply, @Body() signInDto: SignInDto) {
    const jwtTokens = await this.authService.signIn(signInDto);
    
    response.setCookie('accessToken', jwtTokens.accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: this.authService.getAccessTokenTtl(),
    });

    response.setCookie('refreshToken', jwtTokens.refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: this.authService.getRefreshTokenTtl(),
    });

    return { accessToken: jwtTokens.accessToken, refreshToken: jwtTokens.refreshToken }; // For testing, in the future use setCookie.
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(@Res({ passthrough: true }) response: FastifyReply, @Body() refreshTokenDto: RefreshTokenDto) {
    const jwtTokens = await this.authService.refreshTokens(refreshTokenDto);
    
    response.setCookie('accessToken', jwtTokens.accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: this.authService.getAccessTokenTtl(),
    });

    response.setCookie('refreshToken', jwtTokens.refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: this.authService.getRefreshTokenTtl(),
    });

    return { accessToken: jwtTokens.accessToken, refreshToken: jwtTokens.refreshToken }
  }
}
