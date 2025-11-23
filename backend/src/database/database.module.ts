import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as itemsSchema from '../items/schema';
import { DATABASE_CONNECTION } from './database-connection';
import { redisProvider } from './redis.provide';
import { REDIS_CONNECTION } from './redis-connection';
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          max: 10, // размер пула
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        });
        return drizzle(pool, {
          schema: {
            ...itemsSchema,
          },
        });
      },
      // inject: [ConfigService],
    },
    redisProvider,
  ],
  exports: [DATABASE_CONNECTION, REDIS_CONNECTION],
})
export class DatabaseModule {}
