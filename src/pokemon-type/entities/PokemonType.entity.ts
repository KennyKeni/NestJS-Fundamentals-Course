import { Entity, PrimaryKeyProp, ManyToOne, PrimaryKey, Property, OneToMany, Cascade, Collection, Opt } from "@mikro-orm/core";

@Entity()
export class PokemonType {
  @PrimaryKey({ autoincrement: true })
  type_id!: number & Opt;

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => Effectiveness, (effectiveness) => effectiveness.attacking_type, { cascade: [Cascade.ALL] })
  attack_effectiveness = new Collection<Effectiveness>(this);

  @OneToMany(() => Effectiveness, effectiveness => effectiveness.defending_type, { cascade: [Cascade.ALL]})
  defense_effectivenes = new Collection<Effectiveness>(this);
}

@Entity()
export class Effectiveness {
  @ManyToOne(() => PokemonType, { primary: true, deleteRule: 'cascade', updateRule: 'cascade' })
  attacking_type!: PokemonType;

  @ManyToOne(() => PokemonType, { primary: true, deleteRule: 'cascade', updateRule: 'cascade' })
  defending_type!: PokemonType;

  @Property({type: 'decimal', precision: 5, scale: 2})
  multiplier!: number;

  [PrimaryKeyProp]?: ['attacking_type', 'defending_type'];
}