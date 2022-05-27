import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreateOrderDto } from './dto/';

@Injectable()
export class OrderService {
  constructor(private repository: RepositoryService) {}

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
        select: {
          id: true,
        },
      });

      for (const item of orderDetailsList) {
        const orderDetail = await this.repository.orderDetail.update({
          where: { id: item },
          data: { orderId: order.id },
        });
        amount += Number(orderDetail.price);
      }

      /**
       * TODO - There is an error when running the request, but the data is written in db correctly
       */
      const orderWithDetails = this.repository.order.updateMany({
        where: { id: order.id },
        data: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          orderDetails: { set: { id: orderDetailsList } },
          amount,
          shippingAddress,
        },
      });

      return orderWithDetails;
    } catch (e) {
      throw e;
    }
  }
}
