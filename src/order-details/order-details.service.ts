import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { OrderDetailsDto } from './dto/OrderDetails.dto';
import { UpdateOrderDatailsDTO } from './dto';

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

  async updateOrderDetails(body: UpdateOrderDatailsDTO, id: string) {
    try {
      const { productId } = await this.repository.orderDetail.findFirst({
        where: { id },
        select: {
          productId: true,
        },
      });

      const product = await this.repository.product.findFirst({
        where: { id: productId },
      });

      const { quantity } = body;
      const price = product.price * quantity;
      const updatedOrderDetails = await this.repository.orderDetail.update({
        where: { id },
        data: {
          quantity: body.quantity,
          price,
        },
      });
      return updatedOrderDetails;
    } catch (e) {
      throw e;
    }
  }

  async deleteOrderDetails(id: string) {
    try {
      const deletedOrderDetails = await this.repository.orderDetail.delete({
        where: { id },
      });
      return deletedOrderDetails;
    } catch (e) {
      throw e;
    }
  }
}
