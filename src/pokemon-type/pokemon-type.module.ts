import { Module } from '@nestjs/common';
import { PokemonTypeController } from './pokemon-type.controller';
import { PokemonTypeService } from './pokemon-type.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Effectiveness, PokemonType } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([PokemonType, Effectiveness])],
  controllers: [PokemonTypeController],
  providers: [PokemonTypeService],
})
export class PokemonTypeModule {}
