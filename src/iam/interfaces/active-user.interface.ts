import { Role } from "@app/user/enums/role.enum";

export interface ActiveUserData {
  sub: string;

  email: string;

  role: Role;
}