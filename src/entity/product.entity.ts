import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Column()
    stock: number;

    @ManyToOne(() => User, (user) => user.products)
    user: User;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}
