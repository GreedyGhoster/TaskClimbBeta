import { IToDoTask } from "./tasks";

export interface AddToDoProjectFormValues {
  title: string;
}

export interface IToDoProject {
  id: string;
  title: string;
  tasks: IToDoTask[];
}
