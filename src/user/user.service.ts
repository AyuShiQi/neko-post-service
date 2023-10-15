import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly girl: Repository<User>){}

  createNewUser () {
    // 判断username是否存在即可
  }
}
