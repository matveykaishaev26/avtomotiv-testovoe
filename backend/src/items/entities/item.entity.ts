import { InferSelectModel } from 'drizzle-orm';
import * as schema from '../schema';
export type Item = InferSelectModel<typeof schema.itemsTable>;
