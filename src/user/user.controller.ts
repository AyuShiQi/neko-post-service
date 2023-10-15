import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { Request, Response } from 'express'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}
    /**
     * 验证token值并返回基础信息
     * @param req 
     */
    @Get('/verify')
    verifyToken (@Req() req: Request, @Res() res: Response) {
      console.log('come')
      const userToken = req.get('token')
      if (!userToken) return res.json({
        code: 500,
        data: null,
        msg: '无效token'
      })

      // res.set('Access-Control-Allow-Origin', '127.0.0.1::3000')
      return res.json({
        code: 200,
        data: null,
        msg: '有token'
      })
    }

    // @Get('/base')
    // getBaseInfo (@Res() res: Response) {
    //   // res.set('Access-Control-Allow-Origin', '127.0.0.1::3000')
    //   return res.sendFile(path.resolve(__dirname, '../public/user.json'))
    // }
    /**
     * 
     * @param req 
     * 返回用户基础信息和token
     */
    @Post('/create')
    createNewUser (@Req() req: Request) {
      console.log(req.body)
      this.userService.createNewUser()
    }
}