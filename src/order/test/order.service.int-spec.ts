import { RepositoryService } from '../../repository/repository.service';
import { OrderService } from '../order.service';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderDetail } from '../../types/OrderDetail';
import { AppModule } from '../../app.module';
import { Test } from '@nestjs/testing';
import { ProductService } from '../../product/product.service';
import { ProductDto } from '../../product/dto';
import { OrderDetailsDto } from '../../order-details/dto';
import { UserService } from '../../user/user.service';
import { User } from '../../types/User';
import { UserDto, UserRoleDto } from '../../user/dto';
import { CreateOrderDto } from '../dto';

describe('Order Service Integration', () => {
  let repository: RepositoryService;
  let orderService: OrderService;
  let orderDetailsService: OrderDetailsService;
  let productService: ProductService;
  let userService: UserService;
  let orderDetail: OrderDetail;
  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleRef.get(RepositoryService);
    orderService = moduleRef.get(OrderService);
    orderDetailsService = moduleRef.get(OrderDetailsService);
    userService = moduleRef.get(UserService);
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

    const userDTO: UserDto = {
      email: 'testemail@.com',
      password: '123456',
      firstName: 'Borislav',
      lastName: 'Stoyanov',
      role: UserRoleDto.ADMIN,
      address: 'Police dept',
      city: 'Konoha',
      country: 'Konoha',
      zip: '1312',
    };

    const { id: productId } = await productService.createProduct(productDTO);

    const orderDetailDTO: OrderDetailsDto = {
      productId,
      quantity: 2,
    };

    orderDetail = await orderDetailsService.createOrderDetail(orderDetailDTO);
    user = await userService.createUser(userDTO);
  });

  describe('Create an Order', () => {
    it('Should create a new Order', async () => {
      const orderDTO: CreateOrderDto = {
        customerId: user.id,
        orderDetailsList: [orderDetail.id],
      };

      const order = await orderService.createOrder(orderDTO);
      expect(order.id).toBeDefined();
      expect(order.shippingAddress).toBeDefined();
      expect(order.orderDate).toBeDefined();
      expect(order.amount).toEqual(orderDetail.price);
    });
  });
});
