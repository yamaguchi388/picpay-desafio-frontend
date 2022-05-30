import { Task } from '../models/task.model';

export const tasksMock: Task[] = [
  {
    id: 1,
    name: 'Pennie Dumphries',
    username: 'pdumphries0',
    title: 'Dental Hygienist',
    value: 19.96,
    date: '2020-07-21T05:53:20Z',
    image:
      'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
    isPayed: true,
  },
  {
    id: 2,
    name: 'Foster Orthmann',
    username: 'forthmann1',
    title: 'Professor',
    value: 207.36,
    date: '2021-01-28T14:01:29Z',
    image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
    isPayed: true,
  },
];
