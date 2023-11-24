import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resp } from '../entity/resp.entity';
import { Repository } from 'typeorm';
import { MAX_RESPONSE_HISTROY_COUNT } from 'src/common/commonOption';

@Injectable()
export class RespService {
  constructor (@InjectRepository(Resp) private readonly resp: Repository<Resp>) {}
  /**
   * 保存历史响应
   * @param option 配置项
   */
  async saveResp (option: Omit<Resp, 'rid' | 'create_time' | 'update_time' | 'type'>) {
    const { uid, pid, aid, status, statusText, headers, body, request } = option
    const res = await this.deleteOldestNormalResp(uid, pid, aid)
    if (!res) return 501 // 501表示保存响应已达最大上限
    // 最多保存10条记录（可以固定保留）保存最近的10条项目
    const newResp = new Resp()
    newResp.uid = uid
    newResp.pid = pid
    newResp.aid = aid
    // 都先为不固定的
    newResp.type = 0
    newResp.status = status
    newResp.statusText = statusText
    newResp.headers = headers
    newResp.body = body
    newResp.request = request
    await this.resp.save(newResp)
    return 200
  }

  /**
   * 删除一个响应历史，只允许type = 0的被删除
   * @param option 搜索信息
   */
  async delResponse (option: { uid: string, pid: string, aid: string, rid: string }) {
    const { uid, pid, aid, rid } = option
    const target = await this.findRespWithRid(uid, pid, aid, rid)
    if (target && target.type === 0) await this.resp.delete(target)
    return target && target.type === 0 ? 200 : 500
  }

  /**
   * 按顺序获取所有历史响应
   * @param option
   * @returns Resps
   */
  async getAllResponse (option: { uid: string, pid: string, aid: string }) {
    const { uid, pid, aid } = option
    const resps = await this.findAllResp(uid, pid, aid)
    resps.sort((a, b) => b.type === a.type ? b.create_time.getMilliseconds() - a.create_time.getMilliseconds() : b.type - a.type)
    return resps
  }

  findAllResp (uid: string, pid: string, aid: string) {
    return this.resp.find({
      where: {
        uid,
        pid,
        aid,
      }
    })
  }

  findAllNormalResp (uid: string, pid: string, aid: string) {
    return this.resp.find({
      where: {
        uid,
        pid,
        aid,
        type: 0
      }
    })
  }

  findRespWithRid (uid: string, pid: string, aid: string, rid: string) {
    return this.resp.findOne({
      where: {
        uid,
        pid,
        aid,
        rid
      }
    })
  }

  /**
   * 判断并删除最后一条记录
   * @param uid
   * @param pid
   * @param aid
   */
  async deleteOldestNormalResp (uid: string, pid: string, aid: string) {
    const resps = await this.findAllResp(uid, pid, aid)
    if (resps.length >= MAX_RESPONSE_HISTROY_COUNT) {
      // 进入删除步骤, 最老的一条删掉
      resps.sort((a, b) => a.create_time.getMilliseconds() - b.create_time.getMilliseconds())
      // 表示是否删除成功
      let flag = false
      for (const res of resps) {
        // 普通的才能被删除
        if (res.type === 0) {
          await this.resp.delete(res)
          flag = true
          break
        }
      }
      return flag
    }
    return true
  }
}
 