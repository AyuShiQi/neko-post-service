import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>){}

  async verifyToken (token: string) {
    const isExist = await this.user.find({
      where: {
        id: token
      }
    })
    return isExist
  }

  async createNewUser (username: string, password: string) {
    // 判断username是否存在即可
    // 存在返回错误
    const isExist = await this.findUserWithUserName(username)
    if (isExist) return false
    // 创建
    const newUser = new User()
    newUser.username = username
    newUser.password = password
    await this.user.save(newUser)
    console.log(newUser.id)
    // 分配token
    return newUser.id
  }

  async findUserWithUserName (username: string): Promise<boolean> {
    const res = await this.user.find({
      where: {
        username
      }
    })
    return res && res.length !== 0
  }

  async getUserInfo (id: string) {
    const info = await this.findUserWithId(id)
    if (!info) return info
    return {
      username: info.username,
      create_time: info.create_time
    }
  }

  private async findUserWithId (id: string) {
    const res = await this.user.find({
      where: {
        id
      }
    })
    return res ? res[0] : null
  }
}
