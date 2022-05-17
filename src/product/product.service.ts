import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private repository: RepositoryService) {}

  async getAllProducts() {
    try {
      const products = await this.repository.product.findMany();
      return products;
    } catch (e) {
      return e;
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.repository.product.findFirst({
        where: { id: id.toString() },
      });
      console.log('Product: ', product);
      return product;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async createProduct(body: ProductDto) {
    try {
      const product = await this.repository.product.create({
        data: {
          ...body,
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      });
      return product;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async editProduct(body: ProductDto, id: string) {
    try {
      const product = await this.repository.product.update({
        where: {
          id: id.toString(),
        },
        data: { ...body },
      });

      return product;
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }
}
