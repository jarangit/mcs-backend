import { Product } from "src/entity/product.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Entity,
} from "typeorm";

@Entity()
export class StCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date | null;

  @OneToMany(() => Product, (product) => product.STCategory)
  products: Product[];
}
