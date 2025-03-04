import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonsService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto, AssignPokemonTypeDto } from './dto';
import { PaginationQueryDto } from '@app/common/dto/pagination-query.dto';
import { Public } from '@app/common/decorators/public.decorator';
import { Roles } from '@app/iam/authorization/decorators/roles.decorator';
import { Role } from '@app/user/enums/role.enum';

@Controller('pokemon')
export class PokemonsController {
  constructor(private readonly pokemonsServices: PokemonsService) {}

  @Roles(Role.Admin)
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.pokemonsServices.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pokemon = await this.pokemonsServices.findOne(id);
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
