import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.token;
        },
      ]),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.findById(payload.sub);
  }
}
