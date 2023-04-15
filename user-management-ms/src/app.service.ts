import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './model/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(login: string, password: string): Promise<boolean> {
    const userAlreadyExists = await this.userRepository.findOneBy({ login });
    if (userAlreadyExists) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      login,
      password: hashedPassword,
    };

    await this.userRepository.save(user);

    return true;
  }

  async findByLogin(login: string): Promise<User> {
    return this.userRepository.findOneBy({ login });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async login(login: string, password: string): Promise<{ user: User }> {
    const user = await this.findByLogin(login);
    const isPasswordMatching = await this.comparePasswords(
      password,
      user?.password,
    );
    if (!isPasswordMatching) {
      return { user: undefined };
    }
    return { user };
  }

  private async comparePasswords(
    password: string,
    hashedPassword?: string,
  ): Promise<boolean> {
    if (!hashedPassword) {
      return false;
    }
    return bcrypt.compare(password, hashedPassword);
  }
}
