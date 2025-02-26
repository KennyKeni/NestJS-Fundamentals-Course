import { Entity, ManyToOne, PrimaryKeyProp, Property } from "@mikro-orm/core";
import { Pokemon } from "./pokemon.entity";
import { PokemonType } from "src/pokemon-type/entities";

// I will admit the naming is weird, I'll brainstorm sum up later
@Entity()
export class PokemonTyping {

  [PrimaryKeyProp]?: ['pokemon', 'type'];

  @ManyToOne(() => Pokemon, {
    primary: true,
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    fieldName: 'pokemon_uuid', 
    type: 'uuid',
  })
  pokemon!: Pokemon;

  @ManyToOne(() => PokemonType, {
    primary: true,
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    fieldName: 'type_id', 
    columnType: 'smallint',
  })
  type!: PokemonType;

  @Property({ columnType: 'smallint' })
  slot: number;
}