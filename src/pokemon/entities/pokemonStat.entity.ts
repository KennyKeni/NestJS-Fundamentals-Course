import { Entity, OneToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Pokemon } from './pokemon.entity';

@Entity()
export class PokemonStat {

  @OneToOne(() => Pokemon, pokemon => pokemon.stats, { 
    primary: true, 
    owner: true, 
    fieldName: 'pokemon_uuid', 
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    hidden: true
  })
  pokemon!: Pokemon;

  @Property({ columnType: 'smallint' })
  hp!: number;

  @Property({ columnType: 'smallint' })
  attack!: number;

  @Property({ columnType: 'smallint' })
  defense!: number;

  @Property({ columnType: 'smallint' })
  special_attack!: number;

  @Property({ columnType: 'smallint' })
  special_defense!: number;

  @Property({ columnType: 'smallint' })
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