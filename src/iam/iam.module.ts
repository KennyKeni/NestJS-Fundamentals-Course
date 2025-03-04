import { Module } from '@nestjs/common';
import { ArgonService, HashingService } from './hashing';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@app/user/entities';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@app/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { RefreshTokenIdsStorage } from './authentication/storage/refresh-token-ids.storage';
import redisConfig from '@app/config/redis.config';
import { RolesGuard } from './authorization/guards/roles.guard';
import { PermissionGuard } from './authorization/guards/permission.guard';
import { FrameworkContributerPolicyHandler } from './authorization/policies/framework-contributer.policy';
import { PolicyHandlerStorage } from './authorization/policies/policy-handlers.storage';
import { PoliciesGuard } from './authorization/guards/policies.guard';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(redisConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: ArgonService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AccessTokenGuard,
    RefreshTokenIdsStorage,
    AuthenticationService,
    FrameworkContributerPolicyHandler,
    PolicyHandlerStorage,
  ],
  controllers: [AuthenticationController]
})
export class IamModule {}
