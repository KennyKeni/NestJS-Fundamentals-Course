import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { Effectiveness, PokemonType } from './entities';
import { CreateEffectivenessAttackDto, CreateEffectivenessDefenseDto, CreatePokemonTypeDto } from './dto';

@Injectable()
export class PokemonTypeService {
  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: EntityRepository<PokemonType>,
    private readonly em: EntityManager,
  ) {}

  // I should make another "create" that makes default relations, so that we will always guarantee N:M relation
  // between all types (default mult. of 1)
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

  async createEffectivenessAttack(id: string, createEffectivenessAttackDto: CreateEffectivenessAttackDto) {
    const attacking_type = this.pokemonTypeRepository.getReference(+id);
    const defending_type = this.pokemonTypeRepository.getReference(createEffectivenessAttackDto.defending_type);
    return await this.createEffectiveness(attacking_type, defending_type, createEffectivenessAttackDto.multiplier);
  }

  async createEffectivenessDefense(id: string, createEffectivenessDefenseDto: CreateEffectivenessDefenseDto) {
    const attacking_type = this.pokemonTypeRepository.getReference(createEffectivenessDefenseDto.attacking_type);
    const defending_type = this.pokemonTypeRepository.getReference(+id);
    return await this.createEffectiveness(attacking_type, defending_type, createEffectivenessDefenseDto.multiplier);
  }

  private async createEffectiveness(attacking_type: PokemonType, defending_type: PokemonType, multiplier: number) {
    try {

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
