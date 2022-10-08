import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-task-filter.dto';
import { updateDto } from './dto/updateDto.dto';
import { Task, TaskStatus } from './task.enum';
import { TaskmanagenetService } from './taskmanagenet.service';

@Controller('taskmanagenet')
export class TaskmanagenetController {
  constructor(private readonly taskService: TaskmanagenetService) {}

  @Get()
  getTask(@Query() filterDto: GetTaskStatusFilterDto): Promise<Task[]> {
    return this.taskService.getTask(filterDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getaskById(id);
  }

  @Post()
  createTask(@Body() create: CreateTaskDTO) {
    return this.taskService.createTask(create);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Object {
    return this.taskService.deleteTask(id);
    // return data;
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() dto: updateDto) {
    return this.taskService.updateTask(id, dto);
  }

  // @Get()

  // getAllTask(): Task[] {
  //   return this.taskService.getAllTask();
  // }

  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     console.log('title', title);
  //     console.log('description', description);
  //     return this.taskService.createTask(title, description);
  //   }

  // @Get()
  // getTask(@Query() filterDto: GetTaskStatusFilterDto) {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTask();
  //   }
  // }

  // @Post()
  // createTask(@Body() create: CreateTaskDTO): Task {
  //   return this.taskService.createTask(create);
  // }

  // @Get(':id')
  // getTaskById(@Param('id') id: string) {
  //   return this.taskService.getTaskById(id);
  // }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.taskService.delete(id);
  // }

  // @Patch('/:id/status')
  // updateTask(@Param('id') id: string, @Body('status') status: TaskStatus) {
  //   return this.taskService.updateStatus(id, status);
  // }
}
