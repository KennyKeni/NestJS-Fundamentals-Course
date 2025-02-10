
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Pokemon {
  @PrimaryKey({ autoincrement: true })
  pokemon_id?: number;

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
}
