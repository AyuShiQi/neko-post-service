import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { Request, Response } from 'express'
import { ProjService } from './proj.service'
import { UserService } from '../user/user.service'
import { ApisService } from '../apis/apis.service';

import Result from '../common/Result'

@Controller('proj')
export class ProjController {
  constructor (private readonly projService: ProjService, private readonly userService: UserService, private readonly apisService: ApisService) {}
  /**
   * 返回项目列表
   * @param req 
   * @param res 
   */
  @Get('/list')
  async getList (@Req() req: Request, @Res() res: Response) {
    const { uid } = req.query
    console.log(uid)
    const proj = await this.projService.findListWithUid(uid as string)
    if (proj) {
      res.json(Result.getResult(proj, '查询成功', 200))
    } else {
      res.json(Result.getResult(proj, '查询失败', 500))
    }
  }
  
  /**
   * 创建新项目
   * @param req 
   * @param res 
   */
  @Post('/create')
  async createProj (@Req() req: Request, @Res() res: Response) {
    // token
    // uid, username, pname(判断是否存在) (json格式)
    console.log(req.body)
    const proj = await this.projService.createProj(req.body)
    if (proj) {
      res.json(Result.getResult(proj, '创建成功', 200))
    } else {
      res.json(Result.getResult(proj, '创建失败', 500))
    }
  }

  /**
   * 修改项目名称
   * @param req 
   * @param res 
   */
  @Post('/update')
  async updateProj (@Req() req: Request, @Res() res: Response) {
    const { uid, pid, npname } = req.body
    console.log(uid, pid, npname)
    const proj = await this.projService.updateProj(uid, pid, npname)
    if (proj) {
      res.json(Result.getResult(proj, '修改成功', 200))
    } else {
      res.json(Result.getResult(proj, '修改失败', 500))
    }
  }

  /**
   * 删除项目
   * @param req 
   * @param res 
   */
  @Post('/delete')
  async deleteProj (@Req() req: Request, @Res() res: Response) {
    // token
    // uid, username, pname(判断是否存在) (json格式)
    const { uid, pid } = req.body
    console.log('proj/delete', uid, pid)
    // 删除相关接口
    let result = await this.apisService.delApisWithPid(uid, pid)
    result = await this.projService.deleteProj(uid, pid)
    if (result) {
      res.json(Result.getResult(null, '删除成功', 200))
    } else {
      res.json(Result.getResult(null, '删除失败', 500))
    }
  }
}
