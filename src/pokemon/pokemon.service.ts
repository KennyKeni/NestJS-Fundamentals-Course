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
    const exists = await this.pokemonRepository.count({ name: createPokemonDto.name.trim() });
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
        createPokemonDto.slug,
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
      
      // Persist the stats
      txEm.persist(stats);

      // Ensure this updates or we blow up! This relationship is One to One - Mandatory
      pokemon.stats = stats;
      
      return pokemon;
      // transaction flushes
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
