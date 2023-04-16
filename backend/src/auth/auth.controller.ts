import { Body, Controller, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUserDto } from '../common/dtos/login-user.dto';
import { RegisterUserDto } from '../common/dtos/register-user.dto';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/interface/user.interface';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    this.logger.debug(`Registering user with login: ${registerUserDto.login}`);
    await this.authService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  login(
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): void {
    this.logger.debug(`Logging in user with login: ${user.login}`);
    const token = this.authService.generateToken(user);
    response.cookie('token', token, { maxAge: 1000 * 60 * 60 });
  }
}
