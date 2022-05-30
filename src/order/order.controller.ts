import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  public getOrders() {
    return this.orderService.getOrders();
  }

  @Get('/:id')
  public getOrder(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post('/new')
  public createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }
}
