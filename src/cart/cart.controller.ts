import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { CartService } from './cart.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {LocalAuthGuard} from "../auth/local-auth.guard";

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async receiveAllData() {
    return this.cartService.allCartData();
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async writeCartData(@Body() body: {
    _idUser: string;
    items: {
      _idItem: string;
      shopData: string;
      itemQuantity: number;
    }[];
  }) {
    return this.cartService.writeCartData(body._idUser, body.items);
  }
}
