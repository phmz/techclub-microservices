import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    await this.usersService.register(registerUserDto);
  }

  async login(login: string, password: string): Promise<User> {
    const user = await this.usersService.login(login, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  generateToken(user: User): string {
    const payload = { login: user.login, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
