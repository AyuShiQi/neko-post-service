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
  @Column({type: "varchar", length: 36, nullable: true})
  gid: string | null

  // 标题
  @Column({type: "varchar", length: 255})
  title: string

  // 路径接口描述  
  @Column({type: "text", nullable: true})
  desc: string

  // 路径
  @Column({type: "varchar", length: 255})
  path: string

  // 配置  
  @Column({type: "text", nullable: true})
  option: string

  @UpdateDateColumn({type: "timestamp"})
  update_time: Date

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
}