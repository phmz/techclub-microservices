import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../common/dtos/register-user.dto';
import { User } from './model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const user = {
      ...registerUserDto,
      password: hashedPassword,
    };

    await this.userRepository.save(user);
  }

  async findOne(login: string): Promise<User> {
    return this.userRepository.findOneBy({ login });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  me() {
    throw new Error('Method not implemented.');
  }
}
