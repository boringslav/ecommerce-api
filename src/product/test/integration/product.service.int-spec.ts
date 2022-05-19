import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { RepositoryService } from '../../../repository/repository.service';
import { ProductService } from '../../product.service';
import { ProductDto } from '../../dto';

describe('Product Service Integration', () => {
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

  beforeEach(async () => {
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

  describe('Get Products', () => {
    it('Should return an empty array if there are no products', async () => {
      const products = await productService.getAllProducts();
      expect(products).toEqual([]);
    });
    it('Should return an array of products', async () => {
      const product1: ProductDto = {
        name: 'BMW e92 335I',
        description: 'Super fast borkomobile',
        price: 15000,
        image:
          'https://media.schmiedmann.com/media/79312/bmw_335i_e92_by_schmiedmann_finland_hdr03.jpg?maxwidth=1024&maxheight=768',
      };
      const product2: ProductDto = {
        name: 'BMW  330d',
        description: 'Dizel begachka nema',
        price: 15000,
        image:
          'https://cloud.leparking.fr/2021/07/26/04/08/bmw-serie-3-2014-bmw-330d-msport-for-sale-in-sligo-for-21-950-on-donedeal-bleu_8218059308.jpg',
      };

      await productService.createProduct(product1);
      await productService.createProduct(product2);

      const products = await productService.getAllProducts();
      expect(products.at(0).name).toBe(product1.name);
      expect(products.at(0).description).toBe(product1.description);
      expect(products.at(0).price).toBe(product1.price);

      expect(products.at(1).name).toBe(product2.name);
      expect(products.at(1).description).toBe(product2.description);
      expect(products.at(1).price).toBe(product2.price);
    });
  });

  describe('Delete Product By ID', () => {
    it('Should Delete A Product', async () => {
      const productDTO: ProductDto = {
        name: 'BMW e92 335I',
        description: 'Super fast borkomobile',
        price: 15000,
        image:
          'https://media.schmiedmann.com/media/79312/bmw_335i_e92_by_schmiedmann_finland_hdr03.jpg?maxwidth=1024&maxheight=768',
      };

      const { id } = await productService.createProduct(productDTO);
      const deletedProduct = await productService.deleteProduct(id);
      expect(deletedProduct.id).toBe(id);

      const allProducts = await productService.getAllProducts();
      expect(allProducts).toEqual([]);
    });
  });

  describe('Update Product', () => {
    it('Should Update product when provided with valid id and product information', async () => {
      const product: ProductDto = {
        name: 'BMW e92 335I',
        description: 'Super fast borkomobile',
        price: 15000,
        image:
          'https://media.schmiedmann.com/media/79312/bmw_335i_e92_by_schmiedmann_finland_hdr03.jpg?maxwidth=1024&maxheight=768',
      };

      const updatedProductData: ProductDto = {
        name: 'Lamborghini Huracan Evo',
        description: 'The fastest borkomobile',
        price: 150000,
        image:
          'https://www.hartvoorautos.nl/wp-content/uploads/2020/04/lamborghini-huracan-evo-by-novitec.jpg',
      };

      const { id } = await productService.createProduct(product);
      const updatedProduct = await productService.editProduct(
        updatedProductData,
        id,
      );

      expect(updatedProduct.id).toBe(id);
      expect(updatedProduct.price).toBe(updatedProductData.price);
      expect(updatedProduct.name).toBe(updatedProductData.name);
      expect(updatedProduct.description).toBe(updatedProductData.description);
    });
  });
});
