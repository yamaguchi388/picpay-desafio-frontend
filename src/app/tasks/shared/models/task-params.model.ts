import { PaginationParams } from 'src/app/shared/models/pagination.model';
import { Task } from './task.model';

export interface TaskParams extends PaginationParams, Partial<Task> {}
