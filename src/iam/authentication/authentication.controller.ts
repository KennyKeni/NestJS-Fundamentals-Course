import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto';
import { FastifyReply } from 'fastify';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';

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
    const accessToken = await this.authService.signIn(signInDto);
    
    response.setCookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    return { accessToken: accessToken}; // For testing, in the future use setCookie.
  }
}
