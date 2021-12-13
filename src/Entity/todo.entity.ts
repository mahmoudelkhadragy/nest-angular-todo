import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.todos)
  user: UserEntity;

  @Column()
  userId: number;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}
