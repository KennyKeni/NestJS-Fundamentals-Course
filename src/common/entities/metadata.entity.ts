import { Enum, OptionalProps, Property } from "@mikro-orm/core";

/**
 * MetadataEntity is an abtracted that can be extended on provide more context to other entities
 * such as custom Pokemons, Items, or more.
 */
export abstract class MetadataEntity{

  [OptionalProps]?: 'created_at' | 'updated_at' | 'source' | 'implemented';

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date()})
  updated_at = new Date();

  @Property({ default: false })
  implemented!: boolean;

  @Enum({ items: () => EntitySource, nativeEnumName: 'entity_source' })
  source!: EntitySource;
}

/**
 * EntitySource defines where the entity in question orginates from, this is to seperate Pokemons or Items
 * unique to Cobblemon or the Delta server
 */
export enum EntitySource {
  POKEMON = 'pokemon',
  MINECRAFT = 'minecraft',
  COBBLEMON = 'cobblemon',
  DELTA = 'cobblemon_delta',
  UNKNOWN = 'unknown',
}