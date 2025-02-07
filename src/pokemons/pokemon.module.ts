import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService],
  imports: [],
})
export class PokemonModule {}
