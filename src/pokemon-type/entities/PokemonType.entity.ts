import { Entity, PrimaryKey, Property, OneToMany, Cascade, Collection, Opt } from "@mikro-orm/core";
import { Effectiveness } from "./Effectiveness.entity";

@Entity()
export class PokemonType {
  @PrimaryKey({ columnType: 'smallint'})
  id!: number;

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => Effectiveness, effectiveness => effectiveness.attacking_type, { cascade: [Cascade.ALL] })
  attack_effectiveness = new Collection<Effectiveness>(this);

  @OneToMany(() => Effectiveness, effectiveness => effectiveness.defending_type, { cascade: [Cascade.ALL]})
  defense_effectivenes = new Collection<Effectiveness>(this);
}