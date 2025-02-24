import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { PokemonsModule } from './pokemon/pokemon.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(), 
    PokemonsModule, 
    CommonModule, PokemonTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
