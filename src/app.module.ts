import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    RepositoryModule,
    UserModule,
    OrderModule,
    OrderDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
