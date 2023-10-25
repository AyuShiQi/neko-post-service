import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class Api {
  @PrimaryGeneratedColumn("uuid")
  aid: string

  // 所属的用户
  @PrimaryColumn({type: "varchar", length: 36})
  uid: string

  // 所属的项目
  @PrimaryColumn({type: "varchar", length: 36})
  pid: string

  // 接口标题   
  @Column({type: "varchar", length: 40})
  title: string

  // 接口描述
  @Column({type: "varchar", length: 80})
  desc: string

  // 接口类型（基础还是普通）
  @Column({type: "integer"})
  type: number // 0 表示基础配置，1表示普通接口, 2表示项目组(分类文件夹)

  // 所属项目组 group的aid
  @Column({type: "integer"})
  gid: number

  @Column({type: "integer"})
  method: number

  @Column({type: "varchar", length: 255})
  url: string

  @Column({type: "text"})
  params: string

  @Column({type: "text"})
  headers: string

  @Column({type: "text"})
  authorization: string

  @Column({type: "text"})
  body: string

  @UpdateDateColumn({type: "timestamp"})
  update_time: Date

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
}