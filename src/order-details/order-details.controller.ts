import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsDto, UpdateOrderDatailsDTO } from './dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private orderDetailsService: OrderDetailsService) {}

  @Get()
  public getAll() {
    return this.orderDetailsService.getAllOrderDetails();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.orderDetailsService.getOrderDetailById(id);
  }

  @Post('/new')
  public createOrderDetails(@Body() body: OrderDetailsDto) {
    return this.orderDetailsService.createOrderDetail(body);
  }

  @Patch('/update/:id')
  public updateOrderDetails(
    @Body() body: UpdateOrderDatailsDTO,
    @Param('id') id: string,
  ) {
    return this.orderDetailsService.updateOrderDetails(body, id);
  }

  @Delete('/delete/:id')
  public deleteOrderDetails(@Param('id') id: string) {
    return this.orderDetailsService.deleteOrderDetails(id);
  }
}
