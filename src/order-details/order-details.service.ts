import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { OrderDetailsDto } from './dto/OrderDetails.dto';

@Injectable()
export class OrderDetailsService {
  constructor(private repository: RepositoryService) {}

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
