import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjController } from './proj.controller';
import { ProjService } from './proj.service';
import { UserService } from '../user/user.service';
import { Proj } from 'src/entity/proj.entity';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenMiddleware } from 'src/token/token.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Proj]), TypeOrmModule.forFeature([User])],
  controllers: [ProjController],
  providers: [ProjService, UserService]
})
export class ProjModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('apis')
  }
}
