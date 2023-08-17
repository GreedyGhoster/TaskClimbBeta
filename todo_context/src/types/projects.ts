import { IToDoTask } from "./tasks";

export interface AddToDoProjectFormValues {
  title: string;
}

export interface IToDoProject {
  id: string;
  title: string;
  tasks: IToDoTask[];
}

export interface ProjectItem {
  project: IToDoProject;
  projectId: string;
}
