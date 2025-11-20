import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [DrizzleModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
