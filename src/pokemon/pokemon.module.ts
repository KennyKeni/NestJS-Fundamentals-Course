import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemon.controller';
import { PokemonsService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonStat } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([Pokemon, PokemonStat])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
