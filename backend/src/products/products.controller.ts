import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string): Promise<Product> {
    this.logger.debug(`Getting product: ${productId}`);
    return this.productsService.getProduct(productId);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.logger.debug(`Creating product: ${JSON.stringify(createProductDto)}`);
    return this.productsService.createProduct(createProductDto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.debug(`Updating product: ${productId}`);
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string): Promise<void> {
    this.logger.debug(`Deleting product: ${productId}`);
    return this.productsService.deleteProduct(productId);
  }
}
