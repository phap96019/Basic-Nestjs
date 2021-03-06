import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const userExist = await this.userService.findOne(loginDto.email);
    const isMatch =
      userExist !== null
        ? await bcript.compare(loginDto.password, userExist.password)
        : false;
    if (userExist !== null && isMatch) {
      const payload = {
        userId: userExist._id,
        userRole: userExist.role,
      };
      const key = process.env.JWTSECRET;
      const accessToken = this.jwtService.sign(payload, {
        secret: key,
        expiresIn: 600000,
      });
      return {
        accessToken,
      };
    }
    throw new HttpException(
      `The email or password is incorrect`,
      HttpStatus.NOT_FOUND,
    );
  }

  validToken(token: string) {
    const key = process.env.JWTSECRET;
    try {
      const isValid = this.jwtService.verify(token, {
        secret: key,
      });
      return isValid;
    } catch (error) {
      return false;
    }
  }
}
