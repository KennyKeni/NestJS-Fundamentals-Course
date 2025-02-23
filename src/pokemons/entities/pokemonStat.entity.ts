import { Entity, OneToOne, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Pokemon } from './pokemon.entity';

@Entity()
export class PokemonStat {

  @OneToOne(() => Pokemon, pokemon => pokemon.stats, { primary: true, owner: true, orphanRemoval: true })
  pokemon!: Pokemon;

  @Property()
  hp!: number;

  @Property()
  attack!: number;

  @Property()
  defense!: number;

  @Property()
  special_attack!: number;

  @Property()
  special_defense!: number;

  @Property()
  speed!: number;

  [PrimaryKeyProp]?: 'pokemon';
}