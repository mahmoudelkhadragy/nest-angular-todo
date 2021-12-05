import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDTO } from 'src/DTO/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  // get all todos
  async getAllTodos() {
    return await this.repo.find();
  }
  // create new todo
  async createTodo(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const todo = new TodoEntity();
    todo.title = createTodoDTO.title;
    todo.description = createTodoDTO.description;
    todo.status = TodoStatus.OPEN;

    this.repo.create(todo);
    return await this.repo.save(todo);
  }
  // update todo by id and status
  async update(id: number, status: TodoStatus): Promise<TodoEntity> {
    try {
      await this.repo.update({ id }, { status });
      return await this.repo.findOne({ id });
    } catch (err) {
      throw new InternalServerErrorException('Somthing went wrong');
    }
  }

  // delete todo by id
  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.repo.delete(id);
    } catch (err) {
      throw new InternalServerErrorException('Somthing went wrong');
    }
  }
}
