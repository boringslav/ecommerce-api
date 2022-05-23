import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsDto } from './dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private orderDetailsService: OrderDetailsService) {}

  @Get()
  public getAll() {
    return this.orderDetailsService.getAllOrderDetails();
  }

  @Get('/id')
  public getById() {}

  @Post('/new')
  public createOrderDetails(@Body() body: OrderDetailsDto) {
    return this.orderDetailsService.createOrderDetail(body);
  }

  @Patch()
  public updateOrderDetails() {}
}
