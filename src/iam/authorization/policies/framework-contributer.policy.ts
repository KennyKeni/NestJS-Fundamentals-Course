import { Injectable } from "@nestjs/common";
import { Policy } from "./interfaces/policy.interface";
import { PolicyHandler } from "./interfaces/policy-handler.interface";
import { PolicyHandlerStorage } from "./policy-handlers.storage";
import { ActiveUserData } from "@app/iam/interfaces/active-user.interface";

export class FrameworkContributerPolicy implements Policy {
  name = 'FrameworkContributer';
}

@Injectable()
export class FrameworkContributerPolicyHandler
  implements PolicyHandler<FrameworkContributerPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(FrameworkContributerPolicy, this);
  }

  async handle (
    policy: FrameworkContributerPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    const isContributer = user.email.endsWith('test.com');
    if (!isContributer) {
      throw new Error('User is not a contributer');
    }
  }
}