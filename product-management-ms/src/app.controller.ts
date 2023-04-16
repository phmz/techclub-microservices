import { Controller, Logger } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { RoutingKeys } from './common/interface/routing-keys.interface';
import { CreateProductDto } from './common/dto/create-product.dto';
import { AppService } from './app.service';
import { Product } from './common/model/product.entity';
import { UpdateProductDto } from './common/dto/update-product.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @RabbitRPC({
    exchange: 'exchange',
    routingKey: RoutingKeys.CREATE_PRODUCT,
  })
  createProduct(createProductDto: CreateProductDto): any {
    this.logger.debug(`Creating product: ${JSON.stringify(createProductDto)}`);
    return this.appService.create(createProductDto);
  }

  @RabbitRPC({
    exchange: 'exchange',
    routingKey: RoutingKeys.GET_PRODUCTS,
  })
  getProducts(): Promise<Product[]> {
    this.logger.debug(`Getting products`);
    return this.appService.findAll();
  }

  @RabbitRPC({
    exchange: 'exchange',
    routingKey: RoutingKeys.GET_PRODUCT,
  })
  getProduct(id: string): Promise<Product> {
    this.logger.debug(`Getting product: ${id}`);
    return this.appService.findOne(id);
  }

  @RabbitRPC({
    exchange: 'exchange',
    routingKey: RoutingKeys.UPDATE_PRODUCT,
  })
  updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.debug(`Updating product: ${id}`);
    return this.appService.update(id, updateProductDto);
  }

  @RabbitRPC({
    exchange: 'exchange',
    routingKey: RoutingKeys.DELETE_PRODUCT,
  })
  deleteProduct(id: string): Promise<void> {
    this.logger.debug(`Deleting product: ${id}`);
    return this.appService.remove(id);
  }
}
