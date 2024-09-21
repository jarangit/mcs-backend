/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Like } from './like.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date | null;

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];
    
    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]
}
