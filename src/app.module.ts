import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemons/pokemon.module';
import { CommonModule } from './common/common.module';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
  imports: [PokemonModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, PokemonService],
})
export class AppModule {}
