import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

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

  @Put('/edit/:id')
  public editOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    return this.orderService.editOrder(id, body);
  }
}
