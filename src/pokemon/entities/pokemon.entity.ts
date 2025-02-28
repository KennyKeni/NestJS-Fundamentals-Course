
import { BeforeCreate, Cascade, Check, Collection, Entity, Index, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v7 } from 'uuid';
import { PokemonStat } from './pokemonStat.entity';
import { MetadataEntity } from '../../common/entities/metadata.entity';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { PokemonTyping } from './pokemonTyping.entity';

@Entity({ repository: () => PokemonRepository })
export class Pokemon extends MetadataEntity {

  @PrimaryKey({ hidden: true, type: 'uuid' })
  uuid = v7(); 

  @Property()
  national_dex!: number;

  @Property({ unique: true })
  name!: string;

  @Index()
  @Property({ unique: true, hidden: false })
  slug!: string;

  @Property({ columnType: 'smallint'})
  @Check({ expression: 'generation >= 0 AND generation <= 10' }) // 0 generation reserved for custom pokemons
  generation!: number;

  @Property({ nullable: true, type: 'text', columnType: 'text' })
  description?: string;

  @Property({ nullable: true })
  image_url?: string;

  @Property({ nullable: true })
  shiny_url?: string;

  @OneToOne(() => PokemonStat, pokemonStat => pokemonStat.pokemon, { cascade: [Cascade.ALL] })
  stats!: PokemonStat;

  @OneToMany(() => PokemonTyping, pokemonType => pokemonType.pokemon, {
     cascade: [Cascade.ALL],
     serializer: value => value?.map(pokemonTyping => ({
      type: pokemonTyping.type.name,
      slot: pokemonTyping.slot
     }))})
  pokemon_typing = new Collection<PokemonTyping>(this);

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
