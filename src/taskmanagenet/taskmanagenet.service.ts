import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { retry } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './dto/task.repository';
import { updateDto } from './dto/updateDto.dto';
import { Task, TaskStatus } from './task.enum';

@Injectable()
export class TaskmanagenetService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  getTask(filterdto: GetTaskStatusFilterDto): Promise<Task[]> {
    return this.taskRepository.getTask(filterdto);
  }

  createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.getaskById(id);
    return found;
  }

  async deleteTask(id: string): Promise<Object> {
    const found = await this.taskRepository.deleteTask(id);
    return found;
  }

  async updateTask(id: string, dto: updateDto): Promise<Object> {
    return this.taskRepository.updateTask(id, { ...dto });
  }

  // private tasks: Task[] = [];
  // // getAllTask() {
  // //   return this.tasks;
  // // }
  // getAllTask(): Task[] {
  //   return this.tasks;
  // }
  // getTaskWithFilters(filterdto: GetTaskStatusFilterDto): Task[] {
  //   const { status, search } = filterdto;
  //   let task = this.getAllTask();
  //   // seleksi kokndisi
  //   if (status) {
  //     task = task.filter((task) => task.status === status);
  //   }
  //   // seleksi untuk search
  //   if (search) {
  //     task = task.filter((task) => {
  //       if (task.title.includes(search) && task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return task;
  // }
  // //   createTask(title: string, description: string): Task {
  // //     const task: Task = {
  // //       id: uuid(),
  // //       title,
  // //       description,
  // //       status: TaskStatus.OPEN,
  // //     };
  // //     this.tasks.push(task);
  // //     return task;
  // //   }
  // createTask(createTask: CreateTaskDTO): Task {
  //   const { title, description } = createTask;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException('the task no found');
  //   }
  //   return found;
  // }
  // delete(id: string) {
  //   const index = this.tasks.findIndex((index) => index.id === id);
  //   if (!index) {
  //     throw new NotFoundException('the data not found');
  //   }
  //   this.tasks.splice(index, 1);
  //   // this.tasks.filter((task) => task.id !== id);
  // }
  // updateStatus(id: string, update: TaskStatus) {
  //   const newUpdate = this.getTaskById(id);
  //   newUpdate.status = update;
  //   return newUpdate;
  // }
}
