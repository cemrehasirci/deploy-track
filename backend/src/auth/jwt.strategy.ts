import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type AppJwtPayload = {
  sub: number;
  email: string;
  role: string;
  isSystemAdmin: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: AppJwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      isSystemAdmin: payload.isSystemAdmin,
    };
  }
}
