import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../common/dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    await this.usersService.register(registerUserDto);
  }

  async login(login: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(login);
    const isPasswordMatching = await this.comparePasswords(
      password,
      user?.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { ...user, password: undefined };
  }

  generateToken(user: User): string {
    const payload = { login: user.login, sub: user.id };
    return this.jwtService.sign(payload);
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
