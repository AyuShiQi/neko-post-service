import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'
import Result from '../common/Result'

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(@InjectRepository(User) private readonly user: Repository<User>){}
  async use(req: Request, res: Response, next: () => void) {
    console.log(req.url, 'apis 中间件')
    const token = req.get('token')
    if (!token) return
    const isExist = await this.user.find({
      where: {
        id: token
      }
    })
    if (isExist) next()
    else {
      res.json(Result.getResult(null, '请传入正确的token', 400))
    }
  }
}
