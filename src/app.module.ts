import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokemonModule } from './pokemon/pokemon.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { PostgreSqlDriver, ReflectMetadataProvider } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import appConfig from './config/app.config';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.required(),
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(54320),
        DATABASE_USERNAME: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_NAME: Joi.required(),
      }),
    }),
    MikroOrmModule.forRootAsync({
      // imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.getOrThrow('database');
        return {
          driver: PostgreSqlDriver,
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          dbName: dbConfig.dbName,
          entities: ['dist/**/entities/*.entity.js'],
          entitiesTs: ['src/**/entities/*.entity.ts'],
          debug: true,
          metadataProvider: ReflectMetadataProvider,
          extensions: [Migrator, EntityGenerator, SeedManager],
          loadStrategy: 'joined',
        };
      },
    }),
    PokemonModule, 
    PokemonTypeModule, 
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // }
  ],
})
export class AppModule {}
