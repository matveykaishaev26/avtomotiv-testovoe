import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class ItemsService {
  constructor(private drizzle: DrizzleService) {}

  get(limit?: number, offset?: number) {
    return this.drizzle.db.query.itemsTable.findMany({
      limit,
      offset,
    });
  }
}
