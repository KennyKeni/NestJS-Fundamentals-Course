import { Enum, OptionalProps, Property } from "@mikro-orm/core";
import { EntitySource } from "../enums/entityMetadata";

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

  @Enum({ 
    items: () => EntitySource, 
    nativeEnumName: 'entity_source',
    default: EntitySource.UNKNOWN
  })
  source!: EntitySource;
  
}