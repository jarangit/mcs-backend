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
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date | null;

    @ManyToOne(() => User, (user) => user.categories)
    user: User;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
