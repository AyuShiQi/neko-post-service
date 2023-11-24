import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RespController } from './resp.controller';
import { RespService } from './resp.service';
import { Resp } from 'src/entity/resp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenMiddleware } from 'src/token/token.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Resp])],
  controllers: [RespController],
  providers: [RespService]
})
export class RespModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('apis')
  }
}