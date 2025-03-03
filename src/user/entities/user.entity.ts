import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class User extends BaseEntity{
  @PrimaryKey()
  id = v4()

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;
}
