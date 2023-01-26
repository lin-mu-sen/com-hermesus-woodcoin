import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, OneToOne, JoinColumn, OneToMany, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { DeviceService } from "../services/Device.service";
import { v1 } from 'uuid';
import { Session } from "./Session";
import { Device } from "./Device";
import { Transaction } from "./Transactions";
@Entity()
export class Address {
  constructor() { }
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt : Date
  
  @CreateDateColumn()
  createdAt: Date
  
  @Column({ nullable: false, unique:true })
  address: string;

  @Column({ nullable: true, default:0.00 })
  balance: number;

  @Column({ nullable: false})
  chainid: string;
  
  @ManyToOne(() => Device, Device => Device.transactions, { 
    // eager: true,
    nullable: true,
    onDelete:"SET NULL",
    onUpdate:"NO ACTION"
    })
  @JoinColumn()
  device: Device;

  @Column({ default: true, nullable: false })
  status: boolean;

  @ManyToOne(() => Transaction, Transaction => Transaction.from_address,{
    eager: true,
    nullable: true,
    cascade: true,
    onUpdate:"CASCADE",
    onDelete:"CASCADE",
  })
  @JoinColumn({ name: "from_address" })
  from_address: Transaction[];

  @ManyToOne(() => Transaction, Transaction => Transaction.to_address,{
    eager: true,
    nullable: true,
    cascade: true,
    onUpdate:"CASCADE",
    onDelete:"CASCADE",
  })
  @JoinColumn({ name: "to_address" })
  to_address: Transaction[];
}
