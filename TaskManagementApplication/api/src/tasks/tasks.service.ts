import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private taskRepository: TaskRepository) {}

  getTasks(
    filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, @GetUser() user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });

    if (!found) throw new NotFoundException();

    return found;
  }

  async deleteTask(id: string, @GetUser() user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });

    if (result.affected == 0) throw new NotFoundException();
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;

    await this.taskRepository.save(task);

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    this.taskRepository.test();
    return this.taskRepository.createTask(createTaskDto, user);
  }
}
