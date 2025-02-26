import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MikroOrmModule.forRoot(), 
    PokemonModule, 
    PokemonTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
