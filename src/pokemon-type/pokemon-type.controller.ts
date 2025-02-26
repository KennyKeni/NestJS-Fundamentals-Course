import { Body, Controller, Post } from '@nestjs/common';
import { PokemonTypeService } from './pokemon-type.service';
import { CreateEffectivenessDto, CreatePokemonTypeDto } from './dto';

@Controller('type')
export class PokemonTypeController {
  constructor(private readonly pokemonTypeService: PokemonTypeService) {}

  @Post()
  createType(@Body() createPokemonTypeDto: CreatePokemonTypeDto) {
    return createPokemonTypeDto.name;
  }

  @Post('effectiveness')
  createEffectiveness(@Body() createEffectivenessDto: CreateEffectivenessDto) {
    return createEffectivenessDto.attacking_type;
  }
}
