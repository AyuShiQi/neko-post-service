import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class Mock {
  // 虚拟服务id
  @PrimaryGeneratedColumn("uuid")
  mid: string

  // 所属的项目
  @PrimaryColumn({type: "varchar", length: 36})
  pid: string

  // 所属的用户
  @PrimaryColumn({type: "varchar", length: 36})
  uid: string

  // 虚拟服务所属组的id   
  @PrimaryColumn({type: "varchar", length: 36})
  gid: string | null

  // 路径接口描述  
  @Column({type: "text", nullable: true})
  desc: string

  // 路径
  @Column({type: "varchar", length: 255})
  path: string

  // 配置  
  @Column({type: "text", nullable: true, default: '[]'})
  option: string

  @UpdateDateColumn({type: "timestamp"})
  update_time: Date

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
}