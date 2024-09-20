import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';

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

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];
}
