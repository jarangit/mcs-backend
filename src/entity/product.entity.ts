/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Like } from './like.entity';
import { Collection } from './collection.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    thumbnail: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date | null;

    @ManyToOne(() => User, (user) => user.products)
    user: User;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToOne(() => Collection, (collection) => collection.products)
    collection: Collection;

    @OneToMany(() => Like, (like) => like.product)
    likes: Like[]
}
