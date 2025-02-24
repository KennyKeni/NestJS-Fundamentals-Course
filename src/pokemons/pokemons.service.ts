import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { assign, EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { PokemonStat } from './entities/pokemonStat.entity';
import { v7 } from 'uuid';

@Injectable()
export class PokemonsService {

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: EntityRepository<Pokemon>,
    private readonly em: EntityManager,
  ) {}

  findAll() {
    return this.pokemonRepository.findAll();
  }

  async findOne(pokemon_uuid: string) {
    const pokemon = await this.pokemonRepository.findOne({ pokemon_uuid: pokemon_uuid})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_uuid} not found`)
    }
    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    const exists = await this.pokemonRepository.count({ name: createPokemonDto.name });

    if (exists > 0) {
      throw new ConflictException(
        `Pokemon with name '${createPokemonDto.name}' already exists`
      );
    }
    const pokemon = this.em.create(Pokemon, { pokemon_uuid: v7(), ...createPokemonDto});
    const pokemonStats = this.em.create(PokemonStat, {...createPokemonDto.stats, pokemon: pokemon});
    await this.em.persistAndFlush([pokemon, pokemonStats]);

    return pokemon;
}

  async update(pokemon_uuid: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.pokemonRepository.findOne({ pokemon_uuid: pokemon_uuid})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_uuid} not found`);
    }

    wrap(pokemon).assign(updatePokemonDto)
    await this.em.flush();
    return pokemon;
  }

  async remove(pokemon_uuid: string) {
    const pokemon = await this.pokemonRepository.findOne({ pokemon_uuid: pokemon_uuid})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_uuid} not found`);
    }
    this.em.removeAndFlush(pokemon);
    return {
      success: true,
      message: `Pokemon #${pokemon_uuid} successfully removed`
    };
  }
}
