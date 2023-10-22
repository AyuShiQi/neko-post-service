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
    // console.log(newUser.id)
    // 分配token
    return newUser.id
  }

  async getUserInfo (id: string) {
    const info = await this.findUserWithId(id)
    if (!info) return info
    return {
      uid: info.id,
      username: info.username,
      create_time: info.create_time
    }
  }

  async login (username: string, password: string) {
    const targetUser = await this.findUserWithUserName(username)
    if (!targetUser) return null
    return password === targetUser.password ? {
      uid: targetUser.id,
      username: targetUser.username,
      token: targetUser.id
    } :null
  }

  private async findUserWithUserName (username: string) {
    const res = await this.user.find({
      where: {
        username
      }
    })
    return res ? res[0] : null
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
