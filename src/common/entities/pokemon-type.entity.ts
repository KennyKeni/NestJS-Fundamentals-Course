import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class PokemonType {
  @PrimaryKey({ autoincrement: true })
  type_id!: number;

  @Property()
  name!: string;
}