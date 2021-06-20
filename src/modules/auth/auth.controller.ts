import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../users/enums/userRole.enum';
import { AuthService } from './auth.service';
import { Roles } from './decorator/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { JWTAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('testGuard')
  @Roles(UserRole.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  async testGuard(@Req() req: any) {
    return 'hello-guard';
  }
}
