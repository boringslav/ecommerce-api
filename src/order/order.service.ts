import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

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

  async getOrderById(id: string) {
    try {
      const order = await this.repository.order.findUnique({
        where: { id },
      });
      if (!order) {
        throw new NotFoundException('Order does not exist');
      }
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

  async editOrder(id: string, data: UpdateOrderDto) {
    try {
      const { shippingAddress, orderDetailsList } = data;
      let amount = 0;

      const order = await this.repository.order.findUnique({ where: { id } });
      const orderDetails = await this.repository.orderDetail.findMany({
        where: {
          orderId: id,
        },
      });

      const detailsToDelete = orderDetails.filter(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (orderDetail) => !orderDetailsList.includes(orderDetail.id),
      );

      for (const detail of detailsToDelete) {
        await this.repository.orderDetail.delete({
          where: { id: detail.id },
        });
      }

      for (const detailId of orderDetailsList) {
        const currDetail = await this.repository.orderDetail.update({
          where: { id: detailId },
          data: { orderId: id },
        });

        amount += currDetail.price;
      }

      return await this.repository.order.update({
        where: { id },
        data: {
          shippingAddress: shippingAddress,
          amount,
        },
      });
    } catch (e) {}
  }

  async deleteOrder(id: string) {
    try {
      await this.repository.orderDetail.deleteMany({
        where: { orderId: { contains: id } },
      });

      return await this.repository.order.delete({
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }
}
