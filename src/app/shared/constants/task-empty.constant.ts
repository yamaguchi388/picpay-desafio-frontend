import { Task } from "../models/task.interface";

export const TASK_EMPTY: Task = {
    date: (new Date()).toISOString().substring(0, 10),
    id: 0,
    image: '',
    isPayed: false,
    name: '',
    title: '',
    username: '',
    value: undefined
}