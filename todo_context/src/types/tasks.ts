export interface AddToDoTaskFormValues {
  title: string;
}

export interface IToDoTask {
  id: string;
  title: string;
  status: string;
  description: string;
}

export interface PropsForTask {
  task: any;
  projectId?: string;
}
