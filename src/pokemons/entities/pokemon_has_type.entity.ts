import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Pokemon } from './pokemon.entity';

@Entity()
export class PokemonHasType {
  @ManyToOne(() => Pokemon)
  pokemon!: Pokemon;

  @ManyToOne(() => PokemonType)
  pokemonType!: PokemonType;

  @PrimaryKey(() => ['pokemon_id', 'type_id'])

  @Property()
  slot!: number;
}