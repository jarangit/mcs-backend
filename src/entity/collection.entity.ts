/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @OneToMany(() => Product, (product) => product.category)
  @OneToMany(() => Product, (product) => product.collection)
  products: Product[];


}
