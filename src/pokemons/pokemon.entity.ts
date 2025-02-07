import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
/**
 * Primary Key: pokemon_id. 
 * - This is NOT the national dex, instead that is stored in the species to identify pokemons and their forms.
 * - This means that regional forms, megas, etc will all be related to the same "species" and thus nationaldex number.
 * Unique: name, generation
 * Non-null: generation
 * Nullable: image_url, shiny_url, description
 * - I do not expect to have these all, images need to be generated and descriptions need to be made.
 */
@Entity()
export class Pokemon {
  @PrimaryKey({ autoincrement: true })
  pokemon_id!: number;

  @Property({ unique: true })
  name!: string;

  // Nullable alongside shiny_url, description, the frontend will handle displaying an default picture
  @Property({nullable: true })
  image_url?: string;

  @Property({nullable: true })
  shiny_url?: string;

  // Current plans is to have custom generations for custom pokemons.
  @Property()
  generation!: number;

  @Property({nullable: true })
  description!: string;

}