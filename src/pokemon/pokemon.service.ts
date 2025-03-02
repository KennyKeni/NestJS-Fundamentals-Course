import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon, PokemonStat } from './entities';
import { AssignPokemonTypeDto, CreatePokemonDto, UpdatePokemonDto } from './dto';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { CreatePokemonStatDto } from './dto/create-pokemonStat.dto';
import { PokemonRepository } from './repositories/pokemon.repository';
import { PokemonType } from '@app/pokemon-type/entities';
import { PokemonTyping } from './entities/pokemonTyping.entity';
import { PaginationQueryDto } from '@app/common/dto/pagination-query.dto/pagination-query.dto';
import pokemonConfig from './config/pokemon.config';
import { ConfigType } from '@nestjs/config';
import { Public } from '@app/common/decorators/public.decorator';

@Injectable()
export class PokemonsService {

  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly em: EntityManager,
    // @Inject(pokemonConfig.KEY)
    // private readonly pokemonConfiguration: ConfigType<typeof pokemonConfig>,
  ) {}

  @Public()
  async findAll(paginationQuery: PaginationQueryDto) {
    return await this.pokemonRepository.findAllPokemonsDetailed(paginationQuery.limit, paginationQuery.offset);
  }

  async findOne(uuid: string) {
    const pokemon = await this.pokemonRepository.findOne({ uuid: uuid})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${uuid} not found`)
    }
    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    const exists = await this.pokemonRepository.existsByName(createPokemonDto.name)
    if (exists) {
      throw new ConflictException(
        `Pokemon with name '${createPokemonDto.name}' already exists`
      );
    }
    return this.em.transactional(async (txEm) => {
      // Create the Pokemon entity
      const pokemon = new Pokemon(
        createPokemonDto.national_dex,
        createPokemonDto.name,
        createPokemonDto.generation,
        createPokemonDto.description,
        createPokemonDto.image_url,
        createPokemonDto.shiny_url,
      );
      
      // Persist Pokemon to get the UUID (but not flush yet)
      txEm.persist(pokemon);
      
      // Create PokemonStat and link it to the Pokemon
      const pokemonStatDto: CreatePokemonStatDto = createPokemonDto.stats;
      const stats = new PokemonStat(
        pokemon,
        pokemonStatDto.hp,
        pokemonStatDto.attack,
        pokemonStatDto.defense,
        pokemonStatDto.special_attack,
        pokemonStatDto.special_defense,
        pokemonStatDto.speed,
      );

      // Ensure this updates or we blow up! This relationship is One to One - Mandatory
      pokemon.stats = stats;
      
      return pokemon;
      // transaction flushes
    });
  }

  async assignType(slug: string, assignPokemonTypeDto: AssignPokemonTypeDto) {
    const pokemon = await this.pokemonRepository.findOneOrFail({ slug });
    const type = await this.em.findOneOrFail(PokemonType, { id: assignPokemonTypeDto.type_id });
    const pokemonTyping = this.em.create(PokemonTyping, { pokemon, type, slot: assignPokemonTypeDto.slot });
    await this.em.persistAndFlush(pokemonTyping);
    return pokemonTyping;
  }

  async update(pokemon_uuid: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.pokemonRepository.findOne({ uuid: pokemon_uuid});
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_uuid} not found`);
    }

    wrap(pokemon).assign(updatePokemonDto)
    await this.em.flush();
    return pokemon;
  }

  async remove(pokemon_uuid: string) {
    const pokemon = await this.pokemonRepository.findOne({ uuid: pokemon_uuid});
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_uuid} not found`);
    }
    this.em.removeAndFlush(pokemon);
    return {
      success: true,
      message: `Pokemon #${pokemon_uuid} successfully removed`,
    };
  }
}
