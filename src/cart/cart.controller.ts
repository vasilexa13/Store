import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { CartService } from './cart.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {LocalAuthGuard} from "../auth/local-auth.guard";

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {
  }

  @Get()
  async reciveAllData(){
    return this.cartService.allCartData();
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async writeCartData(@Body() body:{
      _idUser:string ,_idItem:string , shop: string , itemQuantity:number}) {
    return this.cartService.writeCartData(body._idUser , body._idItem , body.shop , body.itemQuantity);
  }

}
