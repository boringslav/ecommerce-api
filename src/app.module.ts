import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
