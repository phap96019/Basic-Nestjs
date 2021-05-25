import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
