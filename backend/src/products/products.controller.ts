import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct() {
    return this.productsService.getProduct();
  }

  @Post()
  createProduct() {
    return this.productsService.createProduct();
  }

  @Patch(':id')
  updateProduct() {
    return this.productsService.updateProduct();
  }

  @Delete(':id')
  deleteProduct() {
    return this.productsService.deleteProduct();
  }
}
