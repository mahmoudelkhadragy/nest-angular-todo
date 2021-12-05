import { TodoStatus } from './../Entity/todo.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDTO } from 'src/DTO/create-todo.dto';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';

// http://localhost:3000/api/todos
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDTO) {
    return this.todoService.createTodo(data);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
  ) {
    return this.todoService.update(id, status);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
