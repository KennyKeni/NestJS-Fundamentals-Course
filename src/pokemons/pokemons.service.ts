import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { assign, EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';

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

  async findOne(pokemon_id: string) {
    const pokemon = await this.pokemonRepository.findOne({ pokemon_id: Number(pokemon_id)})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_id} not found`)
    }
    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    const exists = await this.pokemonRepository.count({ name: createPokemonDto.name })

    if (exists > 0) {
      throw new ConflictException(
        `Pokemon with name '${createPokemonDto.name}' already exists`
      );
    }
    
    const pokemon = this.pokemonRepository.create(createPokemonDto)

    this.em.persistAndFlush(pokemon);
    return pokemon;
  }

  async update(pokemon_id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.pokemonRepository.findOne({ pokemon_id: Number(pokemon_id)})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_id} not found`);
    }

    wrap(pokemon).assign(updatePokemonDto)
    await this.em.flush();
    return pokemon;
  }

  async remove(pokemon_id: string) {
    const pokemon = await this.pokemonRepository.findOne({ pokemon_id: Number(pokemon_id)})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_id} not found`);
    }
    this.em.removeAndFlush(pokemon);
    return {
      success: true,
      message: `Pokemon #${pokemon_id} successfully removed`
    };
  }
}
