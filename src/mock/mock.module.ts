import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { User } from 'src/entity/user.entity';
import { Mock } from 'src/entity/mock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenMiddleware } from 'src/token/token.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Mock])],
  controllers: [MockController],
  providers: [MockService]
})
export class MockModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('resp')
  }
}
