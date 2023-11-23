import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class Api {
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

  // 响应类型（当前cur还是历史）
  @Column({type: "integer"})
  type: number // 0 表示当前，1表示历史记录

  // 响应码
  @Column({type: "integer"})
  status: number

  // 响应吗
  @Column({type: "varchar", length: 20})
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