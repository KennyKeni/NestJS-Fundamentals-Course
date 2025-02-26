import { forwardRef, Module } from '@nestjs/common';
import { PokemonTypeController } from './pokemon-type.controller';
import { PokemonTypeService } from './pokemon-type.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Effectiveness, PokemonType } from './entities';
import { PokemonModule } from '@app/pokemon/pokemon.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([PokemonType, Effectiveness]),
    forwardRef(() => PokemonModule),
  ],
  exports: [MikroOrmModule.forFeature([PokemonType])],
  controllers: [PokemonTypeController],
  providers: [PokemonTypeService],
})
export class PokemonTypeModule {}
