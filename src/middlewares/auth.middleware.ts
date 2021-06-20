import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

Injectable();
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  use(req: any, res: Response, next: NextFunction) {
    // console.log('req: ', req);
    const token = req.headers.token || req.body.token || req.query.token;
    if (!token) return false;
    console.log(this.authService);
    // const userId = this.authService.validToken(token);
    // console.log(userId);
    req['userId'] = 1;
    next();
  }
}
