import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterUserDto } from '../common/dtos/register-user.dto';
import { User } from './model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('USER_MANAGEMENT_SERVICE')
    private readonly userManagementClient: ClientProxy,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    const success = await lastValueFrom(
      this.userManagementClient.send({ cmd: 'createUser' }, registerUserDto),
    );

    if (!success) {
      throw new ConflictException('User already exists');
    }
  }

  async findOne(login: string): Promise<User> {
    return lastValueFrom(
      this.userManagementClient.send({ cmd: 'findByLogin' }, { login }),
    );
  }

  async login(login: string, password: string): Promise<User> {
    const user = (
      await lastValueFrom(
        this.userManagementClient.send<{ user: User }>(
          { cmd: 'login' },
          { login, password },
        ),
      )
    ).user;

    return user;
  }

  async findById(id: string): Promise<User> {
    return lastValueFrom(
      this.userManagementClient.send({ cmd: 'findById' }, { id }),
    );
  }
}
