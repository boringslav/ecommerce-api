import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/new')
  public createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }
}
