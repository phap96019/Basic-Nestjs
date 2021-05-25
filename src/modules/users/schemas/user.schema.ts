import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enums/userRole.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  email: string;

  @Prop()
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
