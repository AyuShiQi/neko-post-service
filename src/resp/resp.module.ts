import { Module } from '@nestjs/common';
import { RespController } from './resp.controller';
import { RespService } from './resp.service';

@Module({
  controllers: [RespController],
  providers: [RespService]
})
export class RespModule {}
