import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from './interface/user.interface';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  @Get('me')
  me(@GetUser() user: User): User {
    this.logger.debug(`Getting user with login: ${user.login}`);
    return user;
  }
}
