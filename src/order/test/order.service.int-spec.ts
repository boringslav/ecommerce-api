import { RepositoryService } from '../../repository/repository.service';
import { OrderService } from '../order.service';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderDetail } from '../../types/OrderDetail';
import { AppModule } from '../../app.module';
import { Test } from '@nestjs/testing';
import { ProductService } from '../../product/product.service';
import { ProductDto } from '../../product/dto';
import { OrderDetailsDto } from '../../order-details/dto';

describe('Order Service Integration', () => {
  let repository: RepositoryService;
  let orderService: OrderService;
  let orderDetailsService: OrderDetailsService;
  let productService: ProductService;
  let orderDetail: OrderDetail;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleRef.get(RepositoryService);
    orderService = moduleRef.get(OrderService);
    orderDetailsService = moduleRef.get(OrderDetailsService);
    productService = moduleRef.get(ProductService);
  });

  beforeEach(async () => {
    await repository.cleanDatabase();

    const productDTO: ProductDto = {
      name: 'BMW e92 335I',
      description: 'Super fast borkomobile',
      price: 15000,
      image:
        'https://media.schmiedmann.com/media/79312/bmw_335i_e92_by_schmiedmann_finland_hdr03.jpg?maxwidth=1024&maxheight=768',
    };

    const { id: productId } = await productService.createProduct(productDTO);

    const orderDetailDTO: OrderDetailsDto = {
      productId,
      quantity: 2,
    };

    orderDetail = await orderDetailsService.createOrderDetail(orderDetailDTO);
  });
});
