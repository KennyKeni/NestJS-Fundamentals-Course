import { ActiveUserData } from "@app/iam/interfaces/active-user.interface";
import { Policy } from "./policy.interface";

export interface PolicyHandler<T extends Policy> {
  handle(policy: T, user: ActiveUserData): Promise<void>;
}