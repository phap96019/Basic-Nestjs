import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
