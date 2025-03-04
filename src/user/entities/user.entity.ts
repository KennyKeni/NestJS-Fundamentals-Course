import { BaseEntity, Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Role } from "../enums/role.enum";

@Entity()
export class User extends BaseEntity{
  @PrimaryKey()
  id = v4()

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Enum({ 
    items: () => Role,
    nativeEnumName: 'user_role',
  })
  role = Role.Regular;
}
