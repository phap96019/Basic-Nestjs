import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers.token || request.body.token || request.query.token;
    if (!token) return false;

    const isValid = this.authService.validToken(token);
    if (!isValid) return false;
    request.userId = isValid.userId;
    request.userRole = isValid.userRole;
    return true;
  }
}
