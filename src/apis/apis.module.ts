import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApisService } from './apis.service';
import { ApisController } from './apis.controller';
import { TokenMiddleware } from '../token/token.middleware';
import { User } from '../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ApisService],
  controllers: [ApisController]
})
export class ApisModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('apis')
  }
}
