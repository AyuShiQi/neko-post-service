import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from '../entity/api.entity'
import { title } from 'process';

@Injectable()
export class ApisService {
  constructor (@InjectRepository(Api) private readonly api: Repository<Api>) {}

  /**
   * 获取用户项目api列表
   * @param uid 用户id
   * @param pid 项目id
   */
  async getList (uid: string, pid: string, type = 1) {
    return await this.api.find({
      where: {
        uid,
        pid,
        type
      }
    })
  }

  /**
   * 创建api接口组
   * @param uid 用户id
   * @param pid 项目id
   * @param title 标题
   */
  async createGroup (uid: string, pid: string, title: string, gid?: string) {
    // 检查是否有重复的title
    const has = await this.findApidWithTitleAndType(uid, pid, title, 2)  // 1表示普通接口
    // 代表已经存在，所以返回空结果
    if (has) return null
    // 否则创建api
    const newApiGroup = new Api()
    newApiGroup.uid = uid
    newApiGroup.pid = pid
    if (gid) newApiGroup.gid = gid
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
  async createApi (uid: string, pid: string, title: string, gid?: string) {
    // 检查是否有重复的title
    const has = await this.findApidWithTitleAndType(uid, pid, title, 1)  // 1表示普通接口
    // 代表已经存在，所以返回空结果
    if (has) return null
    // 否则创建api
    const newApi = new Api()
    newApi.uid = uid
    newApi.pid = pid
    if (gid) newApi.gid = gid
    newApi.title = title
    newApi.type = 1
    const res = await this.api.save(newApi)
    return res ? res : null
  }

  /**
   * 获取基础设置
   * @param uid 
   * @param pid 
   * @returns 
   */
  async getBase (uid: string, pid: string) {
    const has = (await this.findApidWithType(uid, pid, 0))[0]  // 1表示普通接口
    if (!has) {
      const newBase = new Api()
      newBase.uid = uid
      newBase.pid = pid
      newBase.type = 0
      newBase.title = '基础配置'
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

  async findApidWithAidAndType (uid: string, pid: string, aid: string, type: number) {
    return await this.api.findOne({
      where: {
        uid,
        pid,
        aid,
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

  async findApidWithAid (uid: string, pid: string, aid: string) {
    return await this.api.findOne({
      where: {
        aid,
        uid,
        pid
      }
    })
  }

  async updateApi (aid: string, uid: string, pid: string, type: number, option: {
      gid?: string,
      title?: string,
      desc?: string,
      method?: string,
      url?: string,
      params?: string,
      headers?: string,
      authorization?: string,
      body?: string
    }) {
      const keySet = new Set<string>(['gid', 'title', 'desc', 'method', 'url', 'params', 'headers', 'authorization', 'body'])
      const target = await this.findApidWithAid(uid, pid, aid)
      if (!target) return null
      for (const key in option) {
        if (!keySet.has(key)) continue
        switch (key) {
          case 'gid':
            if (type === 2) return null
            // 修改gid，先检查gid是不是组的aid
            const group = await this.findApidWithAidAndType(uid, pid, option.gid, 2)
            if (!group) return null
            target.gid = option.gid
            break
          case 'title':
            const has = await this.findApidWithTitleAndType(uid, pid, option.title, type)
            if (!has) return null
            break
          default:
            // 这里就随便修改
            target[key] = option[key]
        }
      }
      return await this.api.save(target)
  }
}
