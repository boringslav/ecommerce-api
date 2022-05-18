import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    RepositoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
