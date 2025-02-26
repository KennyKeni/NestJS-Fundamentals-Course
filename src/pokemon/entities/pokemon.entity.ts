
import { Cascade, Entity, OneToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { v7 } from 'uuid';
import { PokemonStat } from './pokemonStat.entity';
import { MetadataEntity } from '../../common/entities/metadata.entity';

@Entity()
export class Pokemon extends MetadataEntity {

  @PrimaryKey({ hidden: true })
  uuid = v7(); 

  @Property()
  national_dex!: number;

  @Property({ unique: true })
  name!: string;

  @Property({ unique: true })
  slug?: string;

  @Property()
  generation!: number;

  @Property({ nullable: true, type: 'text' })
  description?: string;

  @Property({ nullable: true })
  image_url?: string;

  @Property({ nullable: true })
  shiny_url?: string;

  @OneToOne(() => PokemonStat, pokemonstat => pokemonstat.pokemon, { cascade: [Cascade.ALL] })
  stats!: PokemonStat;

  constructor(
    national_dex: number,
    name: string,
    generation: number,
    description?: string,
    image_url?: string,
    shiny_url?: string,
    slug?: string,
  ) {
    super()
    this.national_dex = national_dex;
    this.name = name.trim();
    this.generation = generation;
    this.description = description;
    this.image_url = image_url;
    this.shiny_url = shiny_url;
    // Gets rid of all non-alphabetical and replace spaces with dash
    this.slug = slug || this.name.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, '-'); // Gets rid of all non-alphabetical and replace spaces with dash
  }
}
