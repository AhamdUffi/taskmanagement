import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import console from 'console';
import { DataSource, EntityManager, EntityTarget, Repository } from 'typeorm';
import { TaskStatus } from '../task.enum';
import { CreateTaskDTO } from './create-task.dto';
import { GetTaskStatusFilterDto } from './get-task-filter.dto';
import { Task } from './task.entity';
import { updateDto } from './updateDto.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    // const { title, description } = createTaskDto;
    const task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async getTask(filterDto: GetTaskStatusFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    if (Object.keys(filterDto).length >= 1) {
      const query = this.createQueryBuilder('task');
      if (status) {
        query.andWhere('task.status= :status', { status });
      }
      if (search) {
        query.andWhere(
          'LOWER(task.title) LIKE LOWER(:search) OR LOWER (task.description) LIKE LOWER(:search)',
          { search: `${search}%` },
        );
      }
      const tasks = await query.getMany();
      return tasks;
    } else {
      return this.find();
    }
    // ini untuk get all
  }

  async getaskById(id: string): Promise<Task> {
    const found = await this.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('task not found');
    }
    return found;
  }

  async deleteTask(id: string): Promise<Object> {
    await this.getaskById(id);
    const found = await this.delete(id);
    return found;
  }

  async updateTask(id: string, dto: updateDto): Promise<Object> {
    await this.update({ id }, { ...dto });
    return this.getaskById(id);
  }
}
