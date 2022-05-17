import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw e;
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.repository.product.findFirst({
        where: { id },
      });

      if (!product) {
        throw new HttpException(`User Not Found!`, HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (e) {
      throw e;
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
        where: { id },
        data: { ...body },
      });

      return product;
    } catch (e) {
      throw e;
    }
  }

  async deleteProduct(id: string) {
    try {
      const deletedProduct = await this.repository.product.delete({
        where: { id },
      });
      return deletedProduct;
    } catch (e) {
      throw e;
    }
  }
}
