import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { RepositoryService } from '../../../repository/repository.service';
import { ProductService } from '../../product.service';
import { ProductDto } from '../../dto';

describe('ProductService Integration', () => {
  let repository: RepositoryService;
  let productService: ProductService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleRef.get(RepositoryService);
    productService = moduleRef.get(ProductService);
    await repository.cleanDatabase();
  });

  describe('Create Product', () => {
    it('Should create Product', async () => {
      const productDTO: ProductDto = {
        name: 'BMW e92 335I',
        description: 'Super fast borkomobile',
        price: 15000,
        image:
          'https://media.schmiedmann.com/media/79312/bmw_335i_e92_by_schmiedmann_finland_hdr03.jpg?maxwidth=1024&maxheight=768',
      };
      const product = await productService.createProduct(productDTO);
      expect(product.name).toBe(productDTO.name);
      expect(product.price).toBe(productDTO.price);
      expect(product.id).toBeDefined();
    });
  });

  describe('Get Product by ID', () => {
    it('Should get existing product by ID', async () => {
      const productDTO: ProductDto = {
        name: 'BMW e92 335I',
        description: 'Super fast borkomobile',
        price: 15000,
        image:
          'https://media.schmiedmann.com/media/79312/bmw_335i_e92_by_schmiedmann_finland_hdr03.jpg?maxwidth=1024&maxheight=768',
      };
      const { id } = await productService.createProduct(productDTO);

      const product = await productService.getProductById(id);
      expect(product.name).toBe(productDTO.name);
      expect(product.price).toBe(productDTO.price);
      expect(product.image).toBe(productDTO.image);
      expect(product.description).toBe(productDTO.description);
    });
  });
});
