import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  })
  rule: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
