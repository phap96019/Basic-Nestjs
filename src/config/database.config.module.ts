import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE),
  ],
})
export class DatabaseConfig {
  constructor() {
    console.log(`Connectd to ${process.env.DATABASE}`);
  }
}
