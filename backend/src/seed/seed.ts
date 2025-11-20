import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import { ItemsService } from '../items/items.service';

export async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const itemsService = app.get(ItemsService);

  const totalCountResult = await itemsService.getCount();
  const count = Number(totalCountResult[0].count);
  console.log('Всего записей в таблице:', count);

  if (count >= 50000) {
    console.log('База уже заполнена');
    await app.close();
    return;
  }

  console.log('Начинаем вставку 50 000 записей...');
  const batchSize = 1000;
  for (let i = count; i < 50000; i += batchSize) {
    const batch: { name: string }[] = [];
    for (let j = 0; j < batchSize && i + j < 50000; j++) {
      batch.push({ name: `Item ${i + j}` });
    }
    await itemsService.create(batch);
    console.log(`Вставлено ${i + batch.length} / 50000`);
  }

  console.log('Seed завершён!');
  await app.close();
}

// Если файл запускается напрямую
if (require.main === module) {
  void runSeed();
}
