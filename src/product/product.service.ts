import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private repository: RepositoryService) {}

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
}
