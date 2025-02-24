
import { Cascade, Entity, OneToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { v7 } from 'uuid';
import { PokemonStat } from './pokemonStat.entity';

@Entity()
export class Pokemon {
  @PrimaryKey()
  pokemon_uuid = v7();

  @Property()
  national_dex!: number;

  @Property({ unique: true })
  name!: string;

  @Property({ nullable: true })
  image_url?: string;

  @Property({ nullable: true })
  shiny_url?: string;

  @Property()
  generation!: number;

  @Property({ nullable: true })
  description?: string;

  @OneToOne(() => PokemonStat, pokemonstat => pokemonstat.pokemon, { cascade: [Cascade.ALL] })
  stats!: PokemonStat;
}
