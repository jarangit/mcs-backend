import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date | null;

    @ManyToOne(() => Product, (product) => product.likes)
    product: Product;
}
