import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { PokemonsController } from './pokemon.controller';
import { PokemonsService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonStat } from './entities';
import { PokemonTypeModule } from '@app/pokemon-type/pokemon-type.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Pokemon, PokemonStat]),
    forwardRef(() => PokemonTypeModule)
  ],
  exports: [MikroOrmModule.forFeature([Pokemon])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonModule {}
