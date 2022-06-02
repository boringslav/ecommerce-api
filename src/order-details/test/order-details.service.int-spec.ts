import { RepositoryService } from '../../repository/repository.service';
import { OrderDetailsService } from '../order-details.service';
import { ProductService } from '../../product/product.service';
import { AppModule } from '../../app.module';
import { Test } from '@nestjs/testing';
import { Product } from '../../types/Product';
import { ProductDto } from '../../product/dto';

describe('Order Detail Service Integration', () => {
  let repository: RepositoryService;
  let orderDetailsService: OrderDetailsService;
  let productService: ProductService;
  let product: Product;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleRef.get(RepositoryService);
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
    product = await productService.createProduct(productDTO);
  });
  describe('Create Order Detail', () => {
    it('Should create Order Detail', async () => {
      const orderDetail = await orderDetailsService.createOrderDetail({
        productId: product.id,
        quantity: 2,
      });

      expect(orderDetail.productId).toBe(product.id);
      expect(orderDetail.price).toBe(product.price * orderDetail.quantity);
    });
  });

  describe('Get Order Details', () => {
    it('Should return an Order Detail', async () => {
      const orderDetail = await orderDetailsService.createOrderDetail({
        productId: product.id,
        quantity: 2,
      });

      const foundOrderDetail = await orderDetailsService.getOrderDetailById(
        orderDetail.id,
      );
      expect(foundOrderDetail.id).toBe(orderDetail.id);
      expect(foundOrderDetail.productId).toBe(orderDetail.productId);
      expect(foundOrderDetail.quantity).toBe(orderDetail.quantity);
    });
    it('Should get All Order Details', async () => {
      const savedDetails = await repository.orderDetail.createMany({
        data: [
          {
            productId: product.id,
            quantity: 2,
            price: product.price * 2,
          },
          {
            productId: product.id,
            quantity: 2,
            price: product.price * 2,
          },
        ],
      });

      const foundDetails = await orderDetailsService.getAllOrderDetails();
      expect(foundDetails.length).toBe(savedDetails.count);
      expect(foundDetails[0].productId).toBeDefined();
      expect(foundDetails[0].productId).toEqual(product.id);
      expect(foundDetails[0].quantity).toEqual(2);
      expect(foundDetails[0].price).toEqual(product.price * 2);
      expect(foundDetails[1].productId).toBeDefined();
      expect(foundDetails[1].productId).toEqual(product.id);
      expect(foundDetails[1].quantity).toEqual(2);
      expect(foundDetails[1].price).toEqual(product.price * 2);
    });
    it('Should return an empty array if there are no Product Details', async () => {
      expect(await orderDetailsService.getAllOrderDetails()).toEqual([]);
    });
  });

  describe('Update Order Detail', () => {
    it('Should Update Order Detail', async () => {
      const orderDetail = await orderDetailsService.createOrderDetail({
        productId: product.id,
        quantity: 1,
      });

      const updatedOrderDetail = await orderDetailsService.updateOrderDetails(
        {
          quantity: 2,
        },
        orderDetail.id,
      );
      expect(updatedOrderDetail.price).toEqual(orderDetail.price * 2);
    });
  });
});
