import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proj } from '../entity/proj.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProjService {
  constructor (@InjectRepository(Proj) private readonly proj: Repository<Proj>) {}

  async createProj (userInfo: { uid: string, pname: string }) {
    const { uid, pname } = userInfo
    // token
    // uid, username, pname(判断是否存在)
    if (await this.findListWithUidAndPname(uid, pname)) return null
    // 否则返回proj的信息
    const newProj = new Proj()
    newProj.uid = uid
    newProj.pname = pname
    const createRes = await this.proj.save(newProj)
    if (createRes) {
      const result = await this.findListWithUidAndPname(uid, pname)
      return result
    } 
    return null
  }

  async updateProj (userInfo: { uid: string, pid: string, npname: string }) {
    const { uid, pid, npname } = userInfo
    // token
    // uid, username, pname(判断是否存在)
    const tProj = await this.findListWithUidAndPid(uid, pid)
    if (!tProj) return null
    // 修改proj的信息
    tProj.pname = npname
    return await this.proj.save(tProj)
  }

  async deleteProj (uid: string, pid: string) {
    // token
    // uid, username, pname(判断是否存在)
    const tproj = await this.findListWithUidAndPid(uid, pid)
    if (!tproj) return false
    this.proj.remove(tproj)
    return true
  }

  async findListWithUid (uid: string) {
    const res = await this.proj.find({
      where: {
        uid
      }
    })
    return res
  }

  async findListWithUidAndPid (uid: string, pid: string) {
    const res = await this.proj.findOne({
      where: {
        uid,
        pid
      }
    })
    return res
  }

  async findListWithUidAndPname (uid: string, pname: string) {
    const res = await this.proj.findOne({
      where: {
        uid,
        pname
      }
    })
    return res
  }
}
