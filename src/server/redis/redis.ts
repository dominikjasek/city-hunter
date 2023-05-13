import { Redis } from '@upstash/redis';

const DEFAULT_EXPIRATION_TIME = 60 * 5; // 5 minutes

export class RedisClient {
  constructor(
    private readonly redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL as string,
      token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    }),
  ) {}

  async getObject<T extends object>(key: string): Promise<T | null> {
    const result: unknown = await this.redis.get(key);
    if (typeof result === 'string') {
      const parsedObject = JSON.parse(result) as T;
      return parsedObject;
    }
    return null;
  }

  async setObject<T extends object>(key: string, value: T): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), { ex: DEFAULT_EXPIRATION_TIME });
  }
}
