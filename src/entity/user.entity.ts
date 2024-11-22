/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Like } from './like.entity';
import { Collection } from './collection.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    profileImage: string;

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

    @OneToMany(() => Collection, (collection) => collection.user)
    collections: Collection[];


    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]
}
