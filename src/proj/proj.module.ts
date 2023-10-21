import { Module } from '@nestjs/common';
import { ProjController } from './proj.controller';
import { ProjService } from './proj.service';
import { Proj } from 'src/entity/proj.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Proj])],
  controllers: [ProjController],
  providers: [ProjService]
})
export class ProjModule {}
