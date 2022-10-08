import { Module } from '@nestjs/common';
import { TaskmanagenetService } from './taskmanagenet.service';
import { TaskmanagenetController } from './taskmanagenet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './dto/task.repository';
import { Task } from './dto/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskmanagenetService, TaskRepository],
  controllers: [TaskmanagenetController],
})
export class TaskmanagenetModule {}
