import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { PokemonsService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto, AssignPokemonTypeDto } from './dto';

@Controller('pokemon')
export class PokemonsController {
  constructor(private readonly pokemonsServices: PokemonsService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.pokemonsServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const pokemon = this.pokemonsServices.findOne(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${id} not found`)
    }
    return pokemon;
  }

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsServices.create(createPokemonDto);
  }

  @Post(':slug/type')
  assignType(@Param('slug') slug: string, @Body() assignPokemonTypeDto: AssignPokemonTypeDto ) {
    return this.pokemonsServices.assignType(slug, assignPokemonTypeDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonsServices.update(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonsServices.remove(id);
  }
}
