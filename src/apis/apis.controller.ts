import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { Request, Response } from 'express'

@Controller('apis')
export class ApisController {
  @Get('/list')
  async getList (@Req() req: Request, @Res() res: Response) {

  }

  @Post('/createDir')
  async createApis (@Req() req: Request, @Res() res: Response) {
    
  }
}
