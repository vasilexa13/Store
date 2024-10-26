import {Controller, Get, Param, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import {SortBy} from './products.enum'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

   @Get(':itemGroup')
  async getAllItems(
      @Param('itemGroup') itemGroup: string,
      @Query('sort') sortBy: string,
   ) {
   const items =  this.productsService.findAll(itemGroup, sortBy);
   return items
  }
  async

}
