import { Entity, Enum, ManyToOne, PrimaryKeyProp, Property } from "@mikro-orm/core";
import { PokemonType } from "./PokemonType.entity";

@Entity()
export class Effectiveness {
  @ManyToOne(() => PokemonType, { 
    primary: true, 
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    columnType: 'smallint',
  })
  attacking_type!: PokemonType;

  @ManyToOne(() => PokemonType, { 
    primary: true, 
    deleteRule: 'cascade', 
    updateRule: 'cascade',
    columnType: 'smallint',
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

  