import {Controller, Get, Param} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

   @Get(':itemGroup')
  async getAllItems(@Param('itemGroup') itemGroup: string) {
   const items =  this.productsService.findAll(itemGroup);
   return items
  }
}
