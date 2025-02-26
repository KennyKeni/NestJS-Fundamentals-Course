import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon, PokemonStat } from './entities';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { v7 } from 'uuid';
import { CreatePokemonStatDto } from './dto/create-pokemonStat.dto';

@Injectable()
export class PokemonsService {

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: EntityRepository<Pokemon>,
    private readonly em: EntityManager,
  ) {}

  findAll() {
    // return this.pokemonRepository.findAll({ populate: ['stats'] });
    // const res = this.em.qb.(Pokemon, 'p')
    //   .select('*')
    //   .join('p.stats', 'ps');
    const qb = this.em.createQueryBuilder(Pokemon, 'p');
    
    qb.select('*')
    .leftJoinAndSelect('p.stats', 'ps');

    return qb.getResultList();
  }

  async findOne(uuid: string) {
    const pokemon = await this.pokemonRepository.findOne({ uuid: uuid})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${uuid} not found`)
    }
    return pokemon;
  }

//   async create(createPokemonDto: CreatePokemonDto) {
//     const exists = await this.pokemonRepository.count({ name: createPokemonDto.name });

//     if (exists > 0) {
//       throw new ConflictException(
//         `Pokemon with name '${createPokemonDto.name}' already exists`
//       );
//     }
//     const pokemon = this.em.create(Pokemon, { uuid: v7(), ...createPokemonDto});
//     const pokemonStats = this.em.create(PokemonStat, {...createPokemonDto.stats, pokemon: pokemon});
//     await this.em.persistAndFlush([pokemon, pokemonStats]);

//     return pokemon;
// }

  async create(createPokemonDto: CreatePokemonDto) {
    return this.em.transactional(async (txEm) => {
      // Create the Pokemon entity
      const pokemon = new Pokemon();
      
      // Set Pokemon properties
      pokemon.national_dex = createPokemonDto.national_dex;
      pokemon.name = createPokemonDto.name;
      pokemon.generation = createPokemonDto.generation;
      pokemon.description = createPokemonDto.description;
      pokemon.image_url = createPokemonDto.image_url;
      pokemon.shiny_url = createPokemonDto.shiny_url;
      pokemon.slug = createPokemonDto.slug || createPokemonDto.name.toLowerCase().replace(/\s+/g, '-');
      
      // Persist Pokemon to get the UUID (but not flush yet)
      txEm.persist(pokemon);
      
      // Create PokemonStat and link it to the Pokemon
      const pokemonStatDto: CreatePokemonStatDto = createPokemonDto.stats;
      const stats = new PokemonStat();
      stats.pokemon = pokemon;
      stats.hp = pokemonStatDto.hp;
      stats.attack = pokemonStatDto.attack;
      stats.defense = pokemonStatDto.defense;
      stats.special_attack = pokemonStatDto.special_attack;
      stats.special_defense = pokemonStatDto.special_defense;
      stats.speed = pokemonStatDto.speed;
      
      // Persist the stats
      txEm.persist(stats);
      
      // Link the stats back to the Pokemon
      pokemon.stats = stats;
      
      // No need to call flush() here as the transaction will handle it
      
      return pokemon;
    });
  }

  async update(pokemon_uuid: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.pokemonRepository.findOne({ uuid: pokemon_uuid})
    if (!pokemon) {
      throw new NotFoundException(`Pokemon #${pokemon_uuid} not found`);
    }

    wrap(pokemon).assign(updatePokemonDto)
    await this.em.flush();
    return pokemon;
  }

  async remove(pokemon_uuid: string) {
    const pokemon = await this.pokemonRepository.findOne({ uuid: pokemon_uuid})
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
