import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  rule: string;
}
