import { Entity, OneToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Pokemon } from './pokemon.entity';

@Entity()
export class PokemonStat {

  @OneToOne(() => Pokemon, pokemon => pokemon.stats, { primary: true, owner: true, fieldName: 'uuid', deleteRule: 'cascade', hidden: true})
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

  constructor(
    pokemon: Pokemon,
    hp: number,
    attack: number,
    defense: number,
    special_attack: number,
    special_defense: number,
    speed: number,
  ) {
    this.pokemon = pokemon;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.special_attack = special_attack;
    this.special_defense = special_defense;
    this.speed = speed;
  }
}