import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class Resp {
  @PrimaryGeneratedColumn("uuid")
  rid: string

  // 所属aid
  @PrimaryColumn({type: "varchar", length: 36})
  aid: string

  // 所属的项目
  @PrimaryColumn({type: "varchar", length: 36})
  pid: string

  // 所属的用户
  @PrimaryColumn({type: "varchar", length: 36})
  uid: string

  // 响应类型（历史记录是否被固定）
  @Column({type: "integer"})
  type: number // 1 表示固定记录，0表示历史记录（被固定记录是无法被删除的）

  // 响应码
  @Column({type: "integer"})
  status: number

  // 响应吗
  @Column({type: "varchar", length: 100})
  statusText: string

  // 响应headers
  @Column({type: "text", nullable: true})
  headers: string

  // 响应data
  @Column({type: "text", nullable: true})
  body: string

  // 响应对应request
  @Column({type: "text", nullable: true})
  request: string

  @UpdateDateColumn({type: "timestamp"})
  update_time: Date

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
}