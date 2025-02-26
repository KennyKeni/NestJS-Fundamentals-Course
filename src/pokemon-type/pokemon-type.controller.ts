import { Body, Controller, Param, Post } from '@nestjs/common';
import { PokemonTypeService } from './pokemon-type.service';
import { CreateEffectivenessAttackDto, CreatePokemonTypeDto } from './dto';

/**
 * Controller for pokemon-types. Any non-GET methods should be authenticated at an admin level
 */
@Controller('type')
export class PokemonTypeController {
  constructor(private readonly pokemonTypeService: PokemonTypeService) {}

  @Post()
  create(@Body() createPokemonTypeDto: CreatePokemonTypeDto) {
    return this.pokemonTypeService.create(createPokemonTypeDto);
  }

  @Post(':id/effectiveness/attack')
  createAttackEffectiveness(@Param('id') id: string, @Body() createEffectivenessDto: CreateEffectivenessAttackDto) {
    return this.pokemonTypeService.createEffectivenessAttack(id, createEffectivenessDto);
  }
}
