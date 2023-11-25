import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { Request, Response } from 'express'
import { RespService } from './resp.service'

import Result from '../common/Result'

@Controller('resp')
export class RespController {
  constructor (private readonly respService: RespService) {}
  @Get('list')
  async getAllResp (@Req() req: Request, @Res() res: Response) {
    const resps = await this.respService.getAllResponse(req.query as any)
    res.json(Result.getResult(resps, resps ? '获取成功' : '获取失败', resps ? 200 : 500))
  }

  @Post('save')
  async saveResp (@Req() req: Request, @Res() res: Response) {
    const status = await this.respService.saveResp(req.body)
    if (status === 200) res.json(Result.getResult(null, '成功添加', 200))
    else {
      res.json(Result.getResult(null, '历史响应已满，无法继续保存最新响应', 501))
    }
  }

  /**
   * 接口只允许删除普通接口
   */
  @Post('delete')
  async delResp (@Req() req: Request, @Res() res: Response) {
    const status = await this.respService.delResponse(req.body)
    if (status === 200) {
      res.json(Result.getResult(null, '删除成功', 200))
    } else {
      res.json(Result.getResult(null, '删除失败', 500))
    }
  }

  /**
   * 更新type
   * @param req 
   * @param res 
   */
  @Post('update_type')
  async updateRespType (@Req() req: Request, @Res() res: Response) {
    const status = await this.respService.updateRespType(req.body)
    if (status === 200) {
      res.json(Result.getResult(null, '更新成功', 200))
    } else {
      res.json(Result.getResult(null, '更新失败', status))
    }
    
  } 
}