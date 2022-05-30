import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreateOrderDto } from './dto/';

@Injectable()
export class OrderService {
  constructor(private repository: RepositoryService) {}

  async getOrders() {
    try {
      return await this.repository.order.findMany();
    } catch (e) {
      throw e;
    }
  }

  async createOrder(body: CreateOrderDto) {
    try {
      // eslint-disable-next-line prefer-const
      let { customerId, orderDetailsList, shippingAddress } = body;
      let amount = 0;

      const customer = await this.repository.user.findUnique({
        where: { id: customerId },
      });
      if (!shippingAddress) {
        shippingAddress = `${customer.address}, ${customer.city}, ${customer.country}, ${customer.zip}`;
      }

      const order = await this.repository.order.create({
        data: {
          customerId,
        },
      });

      for (const item of orderDetailsList) {
        const orderDetail = await this.repository.orderDetail.update({
          where: { id: item },
          data: { orderId: order.id },
        });
        amount += Number(orderDetail.price);
      }

      return await this.repository.order.update({
        where: {
          id: order.id,
        },
        data: {
          amount,
          shippingAddress,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
