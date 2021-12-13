import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from 'src/Entity/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
