import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from '../entity/api.entity'

@Injectable()
export class ApisService {
  constructor (@InjectRepository(Api) private readonly api: Repository<Api>) {}

  /**
   * 获取用户项目api列表
   * @param uid 用户id
   * @param pid 项目id
   */
  async getList (uid: string, pid: string) {
    return await this.api.find({
      where: {
        uid,
        pid
      }
    })
  }

  /**
   * 创建api接口组
   * @param uid 用户id
   * @param pid 项目id
   * @param title 标题
   */
  async createGroup (uid: string, pid: string, title: string) {
    // 检查是否有重复的title
    const has = await this.findApidWithTitleAndType(uid, pid, title, 2)  // 1表示普通接口
    // 代表已经存在，所以返回空结果
    if (has) return null
    // 否则创建api
    const newApiGroup = new Api()
    newApiGroup.uid = uid
    newApiGroup.pid = pid
    newApiGroup.title = title
    newApiGroup.type = 2
    const res = await this.api.save(newApiGroup)
    return res ? res : null
  }

  /**
   * 创建api接口
   * @param uid 用户id
   * @param pid 项目id
   * @param title 标题
   */
  async createApi (uid: string, pid: string, title: string) {
    // 检查是否有重复的title
    const has = await this.findApidWithTitleAndType(uid, pid, title, 1)  // 1表示普通接口
    // 代表已经存在，所以返回空结果
    if (has) return null
    // 否则创建api
    const newApi = new Api()
    newApi.uid = uid
    newApi.pid = pid
    newApi.title = title
    newApi.type = 1
    const res = await this.api.save(newApi)
    return res ? res : null
  }

  async getBase (uid: string, pid: string) {
    const has = (await this.findApidWithType(uid, pid, 0))[0]  // 1表示普通接口
    if (!has) {
      const newBase = new Api()
      newBase.uid = uid
      newBase.pid = pid
      newBase.type = 0
      return await this.api.save(newBase)
    }
    return has
  }

  async findApidWithTitleAndType (uid: string, pid: string, title: string, type: number) {
    return await this.api.findOne({
      where: {
        uid,
        pid,
        title,
        type
      }
    })
  }

  async findApidWithType (uid: string, pid: string, type: number) {
    return await this.api.find({
      where: {
        uid,
        pid,
        type
      }
    })
  }
}
