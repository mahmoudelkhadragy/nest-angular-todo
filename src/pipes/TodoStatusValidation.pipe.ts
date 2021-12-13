import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TodoStatus } from 'src/Entity/todo.entity';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus: TodoStatus[] = [
    TodoStatus.OPEN,
    TodoStatus.INPROGRESS,
    TodoStatus.COMPLETED,
  ];

  transform(value, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid staus.`);
    }
    return value;
  }

  private isStatusValid(status): boolean {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}
