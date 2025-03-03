import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import * as argon2 from 'argon2';

@Injectable()
export class ArgonService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    return argon2.hash(data, {
      type: argon2.argon2id,
      timeCost: 4,
      memoryCost: 131072,
      parallelism: 4,
      hashLength: 32,
    });
  }
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await argon2.verify(encrypted, data)
  }
}
