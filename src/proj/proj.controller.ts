import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { Request, Response } from 'express'

@Controller('proj')
export class ProjController {
  /**
   * 返回项目列表
   * @param req 
   * @param res 
   */
  @Get('/list')
  async getList (@Req() req: Request, @Res() res: Response) {
    
  }
  
  @Post('/createDir')
  async createApis (@Req() req: Request, @Res() res: Response) {
      
  }
}
