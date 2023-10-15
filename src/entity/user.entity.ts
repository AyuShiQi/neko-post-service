import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column({type: "varchar", length: 40})
  username: string

  @Column({type: "varchar", length: 40})
  password: string

  @CreateDateColumn({type: "timestamp"})
  create_time: Date
}