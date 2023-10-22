import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Proj {
  // 项目id
  @PrimaryGeneratedColumn("uuid")
  pid: string

  // 用户id
  @PrimaryColumn({type: "varchar", length: 36})
  uid: string

  // 项目名称
  @Column({type: "varchar", length: 255})
  pname: string

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
  /**
   * 更新时间
   */
  @UpdateDateColumn({type: "timestamp"})
  update_time: Date
}