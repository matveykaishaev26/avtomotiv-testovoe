import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { asc, count, eq } from 'drizzle-orm';
import { REDIS_CONNECTION } from 'src/database/redis-connection';
import Redis from 'ioredis';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    @Inject(REDIS_CONNECTION)
    private readonly redis: Redis,
  ) {}

  async get(limit: number, cursor?: number) {
    const key = `items:${cursor ?? 0}:${limit}`;
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached) as Item[];
    const data = await this.database.query.itemsTable.findMany({
      limit,
      where: cursor ? (item) => eq(item.id, cursor) : undefined,
      orderBy: (item) => asc(item.id),
    });
    await this.redis.set(key, JSON.stringify(data), 'EX', 60);
    return data;
  }
  async create(items: { name: string }[]) {
    return this.database.insert(schema.itemsTable).values(items);
  }
  async getCount() {
    return await this.database
      .select({ count: count() })
      .from(schema.itemsTable);
  }
}
