import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('products')
export class ProductController {
  //Dependency Injection principle
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  getById(@Param() { id }: { id: string }) {
    return this.productService.getProductById(id);
  }

  @Post('/new')
  public createProduct(@Body() body: ProductDto) {
    return this.productService.createProduct(body);
  }

  @Put('/edit/:id')
  public editProduct(
    @Body() body: ProductDto,
    @Param() { id }: { id: string },
  ) {
    console.log('Body: ', body);
    return this.productService.editProduct(body, id);
  }
}
