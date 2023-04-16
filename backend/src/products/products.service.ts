import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProductsService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async createProduct() {}

  async updateProduct() {}

  async deleteProduct() {}

  async getProduct() {}

  async getProducts() {}
}
