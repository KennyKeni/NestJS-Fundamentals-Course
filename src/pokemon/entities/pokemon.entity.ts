
import { BeforeCreate, Cascade, Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v7 } from 'uuid';
import { PokemonStat } from './pokemonStat.entity';
import { MetadataEntity } from '../../common/entities/metadata.entity';
import { PokemonRepository } from '../repositories/pokemon.repository';

@Entity({ repository: () => PokemonRepository })
export class Pokemon extends MetadataEntity {

  @PrimaryKey({ hidden: true, type: 'uuid' })
  uuid = v7(); 

  @Property()
  national_dex!: number;

  @Property({ unique: true })
  name!: string;

  @Property({ unique: true, hidden: false })
  slug!: string;

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

  @BeforeCreate() // Add before update later, but for now fuck it :3
  protected generateSlug() {
    
    // Gets rid of all non-alphabetical and replace spaces with dash
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .replace(/\s+/g, '-');
    
    // Handle empty slug edge case (if name had only special characters)
    if (!this.slug) {
      throw new Error('Cannot generate a valid slug. The name must contain at least one alphabetical character.');
    }
  }

  constructor(
    national_dex: number,
    name: string,
    generation: number,
    description?: string,
    image_url?: string,
    shiny_url?: string,
  ) {
    super()
    this.national_dex = national_dex;
    this.name = name.trim();
    this.generation = generation;
    this.description = description;
    this.image_url = image_url;
    this.shiny_url = shiny_url;
  }
}
