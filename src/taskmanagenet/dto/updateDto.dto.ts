import { TaskStatus } from '../task.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class updateDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
