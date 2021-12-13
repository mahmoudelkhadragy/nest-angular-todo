import { UserEntity } from './../Entity/user.entity';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDTO } from 'src/DTO/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  // get all todos
  async getAllTodos(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('todo');

    query.where(`todo.userId = :userId`, { userId: user.id });

    try {
      return await query.getMany();
    } catch (err) {
      throw new NotFoundException('No todo found');
    }
  }
  // create new todo
  async createTodo(
    createTodoDTO: CreateTodoDTO,
    user: UserEntity,
  ): Promise<TodoEntity> {
    const todo = new TodoEntity();
    todo.title = createTodoDTO.title;
    todo.description = createTodoDTO.description;
    todo.status = TodoStatus.OPEN;
    todo.userId = user.id;

    this.repo.create(todo);
    return await this.repo.save(todo);
  }
  // update todo by id and status
  async update(
    id: number,
    status: TodoStatus,
    user: UserEntity,
  ): Promise<TodoEntity> {
    try {
      await this.repo.update({ id, userId: user.id }, { status });
      return await this.repo.findOne({ id });
    } catch (err) {
      throw new InternalServerErrorException('Somthing went wrong');
    }
  }

  // delete todo by id
  async delete(id: number, user: UserEntity) {
    const result = await this.repo.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException('todo not deleted');
    } else {
      return { success: true };
    }
  }
}
