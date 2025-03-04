import redisConfig from "@app/config/redis.config";
import { InvalidatedRefreshTokenError } from "@app/iam/errors/invalidate-refresh-token.error";
import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RefreshTokenIdsStorage implements 
OnApplicationBootstrap, OnApplicationShutdown 
{
  constructor(
    @Inject(redisConfig.KEY) private readonly redisConfiguration: ConfigType<typeof redisConfig>,
  ) {}

  private redisClient: Redis;
  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: this.redisConfiguration.host,
      port: this.redisConfiguration.port,
    });
  }

  onApplicationShutdown(signal?: string) {
    return this.redisClient.quit();
  }

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.redisClient.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: string): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: string): string {
    return `user-${userId}`;
  }
}
