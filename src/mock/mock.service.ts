import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mock } from '../entity/mock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MockService {
  constructor (@InjectRepository(Mock) private readonly mock: Repository<Mock>) {}
  async getAllMock (opt: Pick<Mock, 'uid' | 'pid'>) {
    const { uid, pid } = opt
    const root = await this.findRootMock(uid, pid)
    if (!root) await this.saveMock({
      uid,
      pid,
      gid: null,
      title: '根路径',
      option: '[]',
      desc: '',
      path: ''
    })
    const mocks = await this.mock.find({
      where: {
        uid,
        pid
      }
    })
    return mocks
  }

  async saveMock (opt: Omit<Mock, 'mid' | 'create_time' | 'update_time'>) {
    const { uid, pid, gid, path, title } = opt
    // 存在相同path，不可创建
    const target = await this.findMockWithPath(uid, pid, gid, path)
    if (target) return 501
    const newMock = new Mock()
    newMock.uid = uid
    newMock.pid = pid
    newMock.gid = gid
    newMock.title = title
    newMock.path = path
    const res = await this.mock.save(newMock)
    return res ? 200 : 500
  }

  async updateMockOpt (option: any) {
    const { uid, pid, gid, mid, opt } = option
    const target = await this.findWithMid(uid, pid, gid, mid)
    if (target) {
      target.option = opt
      await this.mock.save(target)
    }
    return target ? 200 : 500
  }

  async findWithMid (uid: string, pid: string, gid: string, mid: string) {
    return this.mock.findOne({
      where: {
        uid,
        pid,
        gid,
        mid
      }
    })
  }

  async findRootMock (uid: string, pid: string) {
    return this.mock.findOne({
      where: {
        uid,
        pid,
        gid: null
      }
    }) 
  }

  async findMockWithPath (uid: string, pid: string, gid: string, path: string) {
    return this.mock.findOne({
      where: {
        uid,
        pid,
        gid,
        path
      }
    })
  }
}
