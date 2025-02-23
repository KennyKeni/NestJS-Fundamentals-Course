
import { Entity, OneToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { PokemonStat } from './pokemonStat.entity';

@Entity()
export class Pokemon {
  @PrimaryKey({ autoincrement: true })
  pokemon_id!: number & Opt;

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

  @OneToOne(() => PokemonStat, pokemonstat => pokemonstat.pokemon, {orphanRemoval: true})
  stats!: PokemonStat;
}
