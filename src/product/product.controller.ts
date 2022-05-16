import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('products')
export class ProductController {
  //Dependency Injection principle
  constructor(private productService: ProductService) {}

  @Get()
  getAll(): ProductDto[] {
    return [];
  }

  @Post('/new')
  public createProduct(@Body() body: ProductDto) {
    return this.productService.createProduct(body);
  }
}
