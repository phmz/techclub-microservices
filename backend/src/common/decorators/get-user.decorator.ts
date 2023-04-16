import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/interface/user.interface';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
