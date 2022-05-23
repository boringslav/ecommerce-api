import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsDto } from './dto/OrderDetails.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private orderDetailsService: OrderDetailsService) {}

  @Get()
  public getAll() {}

  @Get('/id')
  public getById() {}

  @Post('/new')
  public createOrderDetails(@Body() body: OrderDetailsDto) {
    return this.orderDetailsService.createOrderDetail(body);
  }

  @Patch()
  public updateOrderDetails() {}
}
