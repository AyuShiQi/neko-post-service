import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Proj {
  // 项目id
  @PrimaryGeneratedColumn("uuid")
  pid: string

  // 用户id
  @PrimaryColumn({type: "varchar", length: 36})
  uuid: string

  // 项目名称
  @Column({type: "varchar", length: 255})
  pname: string

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
}