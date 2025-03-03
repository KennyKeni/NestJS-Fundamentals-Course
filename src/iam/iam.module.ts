import { Module } from '@nestjs/common';
import { ArgonService, HashingService } from './hashing';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@app/user/entities';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@app/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: ArgonService,
    },
    AuthenticationService,
  ],
  controllers: [AuthenticationController]
})
export class IamModule {}
