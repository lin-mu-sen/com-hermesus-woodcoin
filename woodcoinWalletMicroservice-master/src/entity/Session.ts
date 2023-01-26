import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { add } from "date-fns";
import {Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne, JoinColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { uuid58 } from "uuid-base58";
import { DeviceService } from "../services/Device.service";
import { SessionService } from "../services/Session.service";
import { Device } from "./Device";
@Entity()
export class Session {
  constructor(){}
    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    updatedAt : Date
  
    @CreateDateColumn()
    createdAt: Date

  //   @OneToOne(() => Device, {
  //     onUpdate:"SET NULL",
  //     onDelete:"SET NULL",
  //     nullable:true
  //   })
  //  @JoinColumn()
  //  session:Device

    @Column({default:add(new Date(), { hours:3 }).toJSON().slice(0, 19).replace('T', ' '), nullable:false})
    expiresOn:Date
    @Column({
        type: "text",
        nullable: false,
      })
    token: string;

    @Column({
        type: "varchar",
        nullable:false
      })
    fingerprint: string;
}
