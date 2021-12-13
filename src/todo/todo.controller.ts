import { UserEntity } from './../Entity/user.entity';
import { TodoStatus } from './../Entity/todo.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDTO } from 'src/DTO/create-todo.dto';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';

// http://localhost:3000/api/todos
@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getAllTodos(@User() user: UserEntity) {
    return this.todoService.getAllTodos(user);
  }

  @Post()
  createNewTodo(
    @Body(ValidationPipe) data: CreateTodoDTO,
    @User() user: UserEntity,
  ) {
    return this.todoService.createTodo(data, user);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
    return this.todoService.delete(id, user);
  }
}
