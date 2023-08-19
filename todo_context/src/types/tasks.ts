export enum ToDoTaskStatus {
  new = 'new',
  doing = 'doing',
  done = 'done',
}

export interface AddToDoTaskFormValues {
  title: string;
  status: ToDoTaskStatus,
  description: string
}

export type EditToDoTaskFormValues = AddToDoTaskFormValues;

export interface IToDoTask {
  id: string;
  title: string;
  status: ToDoTaskStatus;
  description: string;
  projectId: string;
  createdAt: Date;
}