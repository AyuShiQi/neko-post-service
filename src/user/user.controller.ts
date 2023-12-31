import { Controller, Get, Post, Req, Res } from '@nestjs/common'

import { Request, Response } from 'express'

import { UserService } from './user.service'

// import * as bodyParser from 'body-parser'

import Result from '../common/Result'

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}
    /**
     * 验证token值并返回基础信息，暂时用id代替token
     * @param req 
     */
    @Get('/verify')
    async verifyToken (@Req() req: Request, @Res() res: Response) {
      const userToken = req.get('token')
      if (!userToken) return res.json(Result.getResult(null, '无token传值', 500))
      const isExist = await this.userService.verifyToken(userToken)
      
      if (!isExist) return res.json(Result.getResult(null, '无效token', 500))

      // 返回用户基础信息
      const info = await this.userService.getUserInfo(userToken)
      return res.json(Result.getResult(info, '成功获取', 200))
    }

    /**
     * 创建用户
     * @param req body为json
     * 返回用户基础信息和token
     */
    @Post('/create')
    async createNewUser (@Req() req: Request, @Res() res: Response) {
      const { username, password } = req.body
      console.log(username, password)
      const uid = await this.userService.createNewUser(username, password)
      if (uid !== false) res.json(Result.getResult({
        uid,
        token: uid
      }, '创建成功'))
      else res.json(Result.getResult(null, '用户已存在', 500))
    }

    /**
     * 登录接口
     * @param req body为json
     * 返回用户基础信息和token
     */
    @Post('/login')
    async login (@Req() req: Request, @Res() res: Response) {
      const {username, password} = req.body
      // console.log(username, password)
      const userInfo = await this.userService.login(username, password)
      if (userInfo === 0) res.json(Result.getResult(null, '用户不存在', 500))
      else if (userInfo === 1) res.json(Result.getResult(null, '密码错误', 501))
      res.json(Result.getResult(userInfo, '登录成功'))
    }
}