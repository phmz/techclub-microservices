import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interface/product.interface';
import { RoutingKeys } from './interface/routing-keys.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const options = {
      exchange: 'exchange',
      routingKey: RoutingKeys.CREATE_PRODUCT,
      payload: createProductDto,
    };
    return await this.amqpConnection.request(options);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const options = {
      exchange: 'exchange',
      routingKey: RoutingKeys.UPDATE_PRODUCT,
      payload: { id, updateProductDto },
    };
    return await this.amqpConnection.request(options);
  }

  async deleteProduct(id: string): Promise<void> {
    const options = {
      exchange: 'exchange',
      routingKey: RoutingKeys.DELETE_PRODUCT,
      payload: { id },
    };
    await this.amqpConnection.request(options);
  }

  async getProduct(id: string): Promise<Product> {
    const options = {
      exchange: 'exchange',
      routingKey: RoutingKeys.GET_PRODUCT,
      payload: { id },
    };
    return await this.amqpConnection.request(options);
  }

  async getProducts(): Promise<Product[]> {
    const options = {
      exchange: 'exchange',
      routingKey: RoutingKeys.GET_PRODUCTS,
      payload: {},
    };
    return await this.amqpConnection.request(options);
  }
}
