import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, OneToOne, JoinColumn, OneToMany, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { DeviceService } from "../services/Device.service";
import { v1 } from 'uuid';
import { Session } from "./Session";
import { Device } from "./Device";
import { Address } from "./Address";
@Entity()
export class Transaction {
  constructor() { }
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt : Date

  @CreateDateColumn()
  createdAt: Date
  
  @Column({
    type: "varchar",
    nullable: false,
    unique:true,
    transformer: new EncryptionTransformer({
      key: process.env.KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: process.env.IV
    })
  })
  txid: string;
  
  @Column({ nullable: true })
  account: string;

  @Column({ nullable: true, default:0.00 })
  amount: number;

  @Column({ nullable: true, default:false })
  received: boolean;
  
  @ManyToOne(() => Device, Device => Device.transactions, {
    // cascade:false
    onDelete:"SET NULL",
    onUpdate:"NO ACTION"
  })
  @JoinColumn({ name: "device" })
  device: Device;

  @Column({ default: 0, nullable: true })
  status: number;

  @ManyToOne(() => Address, Address => Address.from_address, {
    onDelete:"SET NULL"
  })
  @JoinColumn({ name: "from_address" })
  from_address: Address;

  @ManyToOne(() => Address, Address => Address.to_address, {
    onDelete:"SET NULL"
  })
  @JoinColumn({ name: "to_address" })
  to_address: Address;
}
