import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mock } from '../entity/mock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MockService {
  constructor (@InjectRepository(Mock) private readonly mock: Repository<Mock>) {}
  async getAllMock (opt: Pick<Mock, 'uid' | 'pid'>) {
    const { uid, pid } = opt
    const mocks = await this.mock.find({
      where: {
        uid,
        pid
      }
    })
    return mocks
  }

  async saveMock (opt: Omit<Mock, 'mid' | 'create_time' | 'update_time'>) {
    const { uid, pid, gid, option, desc, path } = opt
    const newMock = new Mock()
    newMock.uid = uid
    newMock.pid = pid
    newMock.gid = gid
    newMock.option = option
    newMock.desc = desc
    newMock.path = path
    const res = await this.mock.save(newMock)
    return res ? 200 : 500
  }
}
