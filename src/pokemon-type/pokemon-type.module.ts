import { Module } from '@nestjs/common';
import { PokemonTypeController } from './pokemon-type.controller';
import { PokemonTypeService } from './pokemon-type.service';

@Module({
  controllers: [PokemonTypeController],
  providers: [PokemonTypeService]
})
export class PokemonTypeModule {}
