import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MockService } from './mock.service';

import { Request, Response } from 'express'
import Result from 'src/common/Result';

@Controller('mock')
export class MockController {
  constructor (private readonly mockService: MockService) {}
  @Get('list')
  async getAllResp (@Req() req: Request, @Res() res: Response) {
    const mocks = await this.mockService.getAllMock(req.query as any)
    res.json(Result.getResult(mocks, mocks ? '获取成功' : '获取失败', mocks ? 200 : 500))
  }

  @Post('save')
  async saveMock (@Req() req: Request, @Res() res: Response) {
    const status = await this.mockService.saveMock(req.body)
    if (status === 200) res.json(Result.getResult(null, '成功添加', 200))
    else if (status === 501) res.json(Result.getResult(null, '路径已存在！', 501))
    else {
      res.json(Result.getResult(null, '添加失败', 500))
    }
  }

  /**
   * 只允许删除非根路径
   */
  @Post('delete')
  async delResp (@Req() req: Request, @Res() res: Response) {
    const status = await this.mockService.deleteMock(req.body)
    if (status === 200) {
      res.json(Result.getResult(null, '删除成功', 200))
    } else {
      res.json(Result.getResult(null, '删除失败', 500))
    }
  }

  /**
   * 更新opt
   * @param req 
   * @param res 
   */
  @Post('update')
  async updateOpt (@Req() req: Request, @Res() res: Response) {
    const status = await this.mockService.updateMockOpt(req.body)
    if (status === 200) {
      res.json(Result.getResult(null, '更新成功', 200))
    } else {
      res.json(Result.getResult(null, '更新失败', status))
    }
  }

  @Post('update-path')
  async updateMockPath (@Req() req: Request, @Res() res: Response) {
    const status = await this.mockService.updateMockPath(req.body)
    if (status === 200) {
      res.json(Result.getResult(null, '更新成功', 200))
    } else if (status === 501) {
      res.json(Result.getResult(null, '路径已存在', status))
    } else {
      res.json(Result.getResult(null, '更新失败', status))
    }
  }

  @Post('update-title')
  async updateMockTitle (@Req() req: Request, @Res() res: Response) {
    const status = await this.mockService.updateMockTitle(req.body)
    if (status === 200) {
      res.json(Result.getResult(null, '更新成功', 200))
    } else {
      res.json(Result.getResult(null, '更新失败', status))
    }
  }
}
