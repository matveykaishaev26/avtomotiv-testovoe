import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { count } from 'drizzle-orm';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async get(limit?: number, offset?: number) {
    return this.database.query.itemsTable.findMany({
      limit,
      offset,
    });
  }
  async create(items: { name: string }[]) {
    return this.database.insert(schema.itemsTable).values({ ...items });
  }
  async getCount() {
    return await this.database
      .select({ count: count() })
      .from(schema.itemsTable);
  }
}
