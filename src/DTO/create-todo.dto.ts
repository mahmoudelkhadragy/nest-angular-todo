import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  description: string;
}
