import { Entity, ManyToOne, PrimaryKeyProp, Property } from "@mikro-orm/core";
import { PokemonType } from "./pokemonType.entity";

@Entity()
export class Effectiveness {
  @ManyToOne(() => PokemonType, { 
    primary: true, 
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    columnType: 'smallint',
    fieldName: 'attack_type_id',
  })
  attacking_type!: PokemonType;

  @ManyToOne(() => PokemonType, { 
    primary: true, 
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    columnType: 'smallint',
    fieldName: 'defend_type_id',
  })
  defending_type!: PokemonType;

  @Property({ 
    type: 'decimal', 
    precision: 3, 
    scale: 2,
    columnType: 'decimal(5,2) CHECK (multiplier IN (0, 0.5, 1.0, 2.0))',
  })
  multiplier!: number;

  [PrimaryKeyProp]?: ['attacking_type', 'defending_type'];
}

  