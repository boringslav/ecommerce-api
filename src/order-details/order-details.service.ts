import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { OrderDetailsDto } from './dto/OrderDetails.dto';

@Injectable()
export class OrderDetailsService {
  constructor(private repository: RepositoryService) {}

  async getAllOrderDetails() {
    try {
      const orderDetails = await this.repository.orderDetail.findMany();
      return orderDetails;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async getOrderDetailById(id: string) {
    try {
      const orderDetail = await this.repository.orderDetail.findUnique({
        where: { id },
      });

      if (!orderDetail) {
        throw new HttpException(`OrderDetail Not Found!`, HttpStatus.NOT_FOUND);
      }

      return orderDetail;
    } catch (e) {
      throw e;
    }
  }

  async createOrderDetail(body: OrderDetailsDto) {
    try {
      const product = await this.repository.product.findFirst({
        where: { id: body.productId },
      });

      const price = product.price * body.quantity;

      const orderDetail = await this.repository.orderDetail.create({
        data: {
          productId: body.productId,
          quantity: body.quantity,
          price,
        },
      });

      return orderDetail;
    } catch (e) {
      throw e;
    }
  }
}
