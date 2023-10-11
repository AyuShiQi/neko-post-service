import { Controller, Get, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    /**
     * 验证token值并返回基础信息
     * @param req 
     */
    @Get('/verify')
    verifyToken (@Req() req: Request, @Res() res: Response) {
      const userToken = req.get('token')
      if (!userToken) return res.json({
        code: 500,
        data: null,
        msg: '无效token'
      })

      return res.json({
        code: 200,
        data: null,
        msg: '有token'
      })
    }
}
