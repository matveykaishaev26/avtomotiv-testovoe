import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { PaginationDto } from './dto/pagination.dto';
import { Query } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.itemsService.get(query.limit, query.offset);
  }
  @Post()
  create(@Body() query: CreateItemDto[]) {
    return this.itemsService.create(query);
  }
}
