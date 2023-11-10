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
    const has = await this.findApiWithTitleAndType(uid, pid, title, 2)  // 1表示普通接口
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
    const has = await this.findApiWithTitleAndType(uid, pid, title, 1)  // 1表示普通接口
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
    const has = (await this.findApiWithType(uid, pid, 0))[0]  // 1表示普通接口
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

  /**
   * 更新接口信息
   * @param aid 接口id
   * @param uid 用户id
   * @param pid 项目id
   * @param type 接口type
   * @param option 修改信息
   * @returns 保存更新api信息
   */
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
    // console.log('进入 update')
    const keySet = new Set<string>(['gid', 'title', 'desc', 'method', 'url', 'params', 'headers', 'authorization', 'body'])
    const target = await this.findApiWithAid(uid, pid, aid)
    if (!target) return null
    for (const key in option) {
      if (!keySet.has(key)) continue
      switch (key) {
        case 'gid':
          if (type === 2) return null
          // 修改gid，先检查gid是不是组的aid
          const group = await this.findApiWithAidAndType(uid, pid, option.gid, 2)
          // console.log('寻找group', group)
          // if (!group) return null
          target.gid = option.gid
          // console.log('修改gid成功')
          break
        case 'title':
          const has = await this.findApiWithTitleAndType(uid, pid, option.title, type)
          // console.log('修改title')
          if (has && has.aid !== aid) return null
          target.title = option.title 
          // console.log('修改成功title')
          break
        default:
          // 这里就随便修改
          target[key] = option[key]
      }
    }
    // console.log('update 进入最终阶段')
    return await this.api.save(target)
  }

  /**
   * 删除一个普通接口
   * @param uid
   * @param pid
   * @param aid
   */
  async delApi (uid: string, pid: string, aid: string) {
    const api = await this.findApiWithAidAndType(uid, pid, aid, 1)
    if (api) await this.api.remove(api)
    return !!api
  }

  /**
   * 删除一个组
   * @param uid
   * @param pid
   * @param aid
   */
  async delApiGroup (uid: string, pid: string, aid: string) {
    const group = await this.findApiWithAidAndType(uid, pid, aid, 2)
    if (!group) return false
    const apis = await this.findApiWithGid(uid, pid, aid)
    for (const api of apis) {
      await this.api.remove(api)
    }
    await this.api.remove(group)
    return true
  }

  /**
   * 通过项目id删除接口
   * @param uid 
   * @param pid 
   */
  async delApisWithPid (uid: string, pid: string) {
    const apis = await this.findApiWithPid(uid, pid)
    console.log('del Api', apis)
    for (const api of apis) {
      await this.api.remove(api)
    }
    return true
  }

  /**
   * 通过项目id和aid删除接口
   * @param uid 
   * @param pid 
   */
  async delApisWithPidAndAid (uid: string, pid: string, aid: string) {
    const api = await this.findApiWithAid(uid, pid, aid)
    if (!api) return false
    this.api.remove(api)
    return true
  }

  /**
   * 通过项目id找到接口
   * @param uid 
   * @param pid 
   */
  async findApiWithPid (uid: string, pid: string) {
    return await this.api.find({
      where: {
        uid,
        pid
      }
    })
  }

  /**
   * 通过标题和接口类型找到一个接口
   * @param uid
   * @param pid
   * @param title
   * @param type
   * @returns 一个接口
   */
  async findApiWithTitleAndType (uid: string, pid: string, title: string, type: number) {
    return await this.api.findOne({
      where: {
        uid,
        pid,
        title,
        type
      }
    })
  }

  /**
   * 通过接口id和接口类型找到一个接口
   * @param uid
   * @param pid
   * @param title
   * @param type
   * @returns 一个接口
   */
  async findApiWithAidAndType (uid: string, pid: string, aid: string, type: number) {
    return await this.api.findOne({
      where: {
        uid,
        pid,
        aid,
        type
      }
    })
  }

  /**
   * 通过接口类型找到接口s
   * @param uid
   * @param pid
   * @param title
   * @param type
   * @returns 接口s
   */
  async findApiWithType (uid: string, pid: string, type: number) {
    return await this.api.find({
      where: {
        uid,
        pid,
        type
      }
    })
  }

  /**
   * 通过接口id找到一个接口
   * @param uid
   * @param pid
   * @param title
   * @param type
   * @returns 一个接口
   */
  async findApiWithAid (uid: string, pid: string, aid: string) {
    return await this.api.findOne({
      where: {
        aid,
        uid,
        pid
      }
    })
  }

  /**
   * 通过接口gid找到一个接口
   * @param uid
   * @param pid
   * @param title
   * @param type
   * @returns 一个接口
   */
  async findApiWithGid (uid: string, pid: string, gid: string) {
    return await this.api.find({
      where: {
        gid,
        uid,
        pid
      }
    })
  }
}
