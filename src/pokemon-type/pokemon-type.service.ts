import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { Effectiveness, PokemonType } from './entities';
import { CreateEffectivenessAttackDto, CreatePokemonTypeDto } from './dto';

@Injectable()
export class PokemonTypeService {
  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: EntityRepository<PokemonType>,
    private readonly em: EntityManager,
  ) {}

  async create(createPokemonTypeDto: CreatePokemonTypeDto) {
    try {
      const pokemonType = this.em.create(PokemonType, createPokemonTypeDto);
      await this.em.persistAndFlush(pokemonType);
      return pokemonType;
    } catch (error) {
      await this.em.clear();
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException(`Pokemon type ${createPokemonTypeDto.name} already exists`);
      }
      throw error;
    }
  }

  async createEffectivenessAttack(id: string, createAttackEffectiveness: CreateEffectivenessAttackDto) {
    try {
      const attacking_type = this.pokemonTypeRepository.getReference(+id);
      const defending_type = this.pokemonTypeRepository.getReference(createAttackEffectiveness.defending_type);
      const multiplier = createAttackEffectiveness.multiplier;

      const effectivenes = this.em.create(Effectiveness, {attacking_type, defending_type, multiplier});
      await this.em.persistAndFlush(effectivenes);
      return effectivenes;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException(`dupe`);
      }
      throw error;
    }
  }
}
