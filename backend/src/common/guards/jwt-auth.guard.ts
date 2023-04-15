import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (user) {
      return user;
    }
    if (isPublic) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
