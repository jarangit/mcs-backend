/* eslint-disable prettier/prettier */
import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.likes)
  user:User

  @ManyToMany(() => Product, product => product.likes)
  product:Product
}