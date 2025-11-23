import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CONNECTION } from './redis-connection';

export const redisProvider: Provider = {
  provide: REDIS_CONNECTION,
  useFactory: () => {
    const client = new Redis({
      host: process.env.REDIS_HOST ?? 'redis',
      port: process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : 6379,
    });
    return client;
  },
};
