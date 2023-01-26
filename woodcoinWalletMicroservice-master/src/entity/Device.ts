import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, OneToOne, JoinColumn, OneToMany, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { DeviceService } from "../services/Device.service";
import { v1 } from 'uuid';
import { Session } from "./Session";
import { Transaction } from "./Transactions";
@Entity()
export class Device {
  constructor() { }
  @PrimaryGeneratedColumn()
  id: number;

  @DeleteDateColumn()
  deletedAt: Date

  @UpdateDateColumn()
  updatedAt : Date
  
  @CreateDateColumn()
  createdAt: Date

  @Column({
    type: "varchar",
    nullable: true,
    transformer: new EncryptionTransformer({
      key: process.env.KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: process.env.IV
    })
  })
  fingerprint: string;

  @Column({ nullable: true })
  account: string;

  @Column({ nullable: true })
  onSignal: string;

  @Column({ nullable: true, default:"android" })
  platform: string;

  @Column({ default: true, nullable: true })
  active: boolean;

  @OneToOne(() => Session, {
    cascade:true,
    onUpdate:"CASCADE",
    onDelete:"CASCADE",
    nullable:true
  })
 @JoinColumn()
 session:Session
 
  @Column({
    type: "varchar",
    nullable: false,
    unique:true,
    transformer: new EncryptionTransformer({
      key: process.env.KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv:process.env.IV
    })
  })
  passphrase: string;
 
  @OneToMany(() => Transaction, Transaction=> Transaction.device ,{
    eager: true,
    nullable: true,
    cascade: true,
    onDelete:"SET NULL"
  })
  @JoinColumn({ name: "transactions" })
  transactions:Transaction[]
}
