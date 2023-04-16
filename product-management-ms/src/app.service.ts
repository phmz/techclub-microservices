import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './common/dto/create-product.dto';
import { Product } from './common/model/product.entity';
import { UpdateProductDto } from './common/dto/update-product.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneByOrFail({ id });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;

    return await this.productRepository.save(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneByOrFail({ id });

    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
