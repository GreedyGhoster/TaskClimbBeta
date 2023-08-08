export interface AddToDoTaskFormValues {
  title: string;
}

export interface IToDoTask {
  id: string;
  title: string;
  status: string;
}

export interface PropsForTask {
  task: any;
  projectId?: string;
  getStatus: any;
}
