import { Controller, Get, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import { ApisService } from './apis.service'
import Result from '../common/Result'

@Controller('apis')
export class ApisController {
  constructor (private readonly apisService: ApisService) {}
  /**
   * 获取接口列表
   * @param req
   * @param res
   */
  @Get('/list')
  async getList (@Req() req: Request, @Res() res: Response) {
    // 需要uid，pid，token（中间件已测）（接口内容：{
    //   type: 0 1 2 3 4 5 6 7 8 (0 代表base基础配置)
    //   title, desc, 
    //   methods, url(或者是完全体url), headers, params, body 
    //   base：{
    //     baseUrl：
    //     header
    //   }
    // }）
    const { uid, pid } = req.params
    const result = await this.apisService.getList(uid, pid)
    if (result) res.json(Result.getResult(result, '查询成功', 200))
    else res.json(Result.getResult(result, '查询失败', 500))
  }

  /**
   * 获取分组列表
   * @param req
   * @param res
   */
  @Get('/groupList')
  async getGroupList (@Req() req: Request, @Res() res: Response) {
    // 需要uid，pid，token（中间件已测）（接口内容：{
    //   type: 0 1 2 3 4 5 6 7 8 (0 代表base基础配置)
    //   title, desc, 
    //   methods, url(或者是完全体url), headers, params, body 
    //   base：{
    //     baseUrl：
    //     header
    //   }
    // }）
    const { uid, pid } = req.params
    const result = await this.apisService.getList(uid, pid, 2)
    if (result) res.json(Result.getResult(result, '查询成功', 200))
    else res.json(Result.getResult(result, '查询失败', 500))
  }

  /**
   * 创建接口分类
   * @param req 
   * @param res 
   */
  @Post('/createGroup')
  async createGroup (@Req() req: Request, @Res() res: Response) {
    const { uid, pid, title } = req.body
    // const result = await this.apisService.getList(uid, pid, title)
    const result = await this.apisService.createGroup(uid, pid, title)
    if (result) res.json(Result.getResult(result, '创建成功', 200))
    else res.json(Result.getResult(result, '创建成功', 500))
  }

  /**
   * 创建项目接口
   * @param req 
   * @param res 
   */
  @Post('/create')
  async createApi (@Req() req: Request, @Res() res: Response) {
    const { uid, pid, title } = req.body
    const result = await this.apisService.createApi(uid, pid, title)
    if (result) res.json(Result.getResult(result, '创建成功', 200))
    else res.json(Result.getResult(result, '创建成功', 500))
  }

  /**
   * 创建项目接口
   * @param req 
   * @param res 
   */
  @Post('/base')
  async getBase (@Req() req: Request, @Res() res: Response) {
    const { uid, pid } = req.body
    const result = await this.apisService.getBase(uid, pid)
    res.json(Result.getResult(result, '返回成功', 200))
  }
}
