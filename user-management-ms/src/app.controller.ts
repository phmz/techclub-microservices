import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './model/user.entity';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<boolean> {
    this.logger.debug(`Creating user with login: ${login}`);
    return this.appService.createUser(login, password);
  }

  @MessagePattern({ cmd: 'findByLogin' })
  async findByLogin({ login }: { login: string }): Promise<User> {
    this.logger.debug(`Finding user with login: ${login}`);
    return this.appService.findByLogin(login);
  }

  @MessagePattern({ cmd: 'findById' })
  async findById({ id }: { id: string }): Promise<User> {
    this.logger.debug(`Finding user with id: ${id}`);
    return this.appService.findById(id);
  }

  @MessagePattern({ cmd: 'login' })
  async login({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<{ user: User }> {
    this.logger.debug(`Logging in user with login: ${login}`);
    return this.appService.login(login, password);
  }
}
