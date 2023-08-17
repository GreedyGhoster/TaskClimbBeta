import constate from "constate";
import { useCallback, useMemo, useState } from "react";
import { IToDoProject, IToDoTask } from "../types";
import { v4 as uuidv4 } from "uuid";

function useTodoFunc() {
  const [projects, setProjects] = useState<IToDoProject[]>([
    { id: "home", title: "Home", tasks: [] },
  ]);
  const [tasks, setTasks] = useState<IToDoTask[]>([]);
  const addProject = useCallback((projectName: string) => {
    setProjects((prev) => [
      { id: uuidv4(), title: projectName, tasks: tasks },
      ...prev,
    ]);
  }, []);

  const findProject = useCallback(
    (projectId: string) => {
      return projects.find((project) => project.id === projectId);
    },
    [projects]
  );

  const findTask = useCallback(
    (arrayTasks: IToDoTask[], taskId: string) => {
      return arrayTasks.find((task) => task.id === taskId);
    },
    [tasks]
  );

  const addTask = useCallback(
    (
      projectId: string,
      taskName: string,
      status: string,
      description: string
    ) => {
      setProjects((prev) => {
        const next = [...prev];
        const project = next.find((project) => project.id === projectId);
        if (project) {
          setTasks(
            (project.tasks = [
              {
                title: taskName,
                id: uuidv4(),
                status: status,
                description: description,
              },
              ...project.tasks,
            ])
          );
        }
        return next;
      });
    },
    []
  );

  const editStatus = useCallback(
    (
      taskId: string,
      arrayTasks: IToDoTask[],
      title: string,
      newStatus: string,
      description: string
    ) => {
      const idx = arrayTasks.findIndex((task) => task.id === taskId);
      setTasks(() => {
        return arrayTasks.splice(idx, 1, {
          title: title,
          id: taskId,
          status: newStatus,
          description: description,
        });
      });
    },
    []
  );

  const editTitle = useCallback(
    (
      taskId: string,
      arrayTasks: IToDoTask[],
      newTitle: string,
      description: string,
      status: string
    ) => {
      const idx = arrayTasks.findIndex((task) => task.id === taskId);
      setTasks(() => {
        return arrayTasks.splice(idx, 1, {
          title: newTitle,
          id: taskId,
          status: status,
          description: description,
        });
      });
    },
    []
  );

  const editDescription = useCallback(
    (
      taskId: string,
      arrayTasks: IToDoTask[],
      title: string,
      newDescription: string,
      status: string
    ) => {
      const idx = arrayTasks.findIndex((task) => task.id === taskId);
      setTasks(() => {
        return arrayTasks.splice(idx, 1, {
          title: title,
          id: taskId,
          status: status,
          description: newDescription,
        });
      });
    },
    []
  );

  const editProject = useCallback(
    (projectId: string, newTitle: string, tasks: IToDoTask[]) => {
      setProjects(() => {
        const idx = projects.findIndex((project) => project.id === projectId);
        return projects.splice(idx, 1, {
          id: projectId,
          title: newTitle,
          tasks: tasks,
        });
      });
    },
    [projects]
  );

  const deleteTask = useCallback(
    (arrayTasks: IToDoTask[], taskId: string) => {
      const idx = arrayTasks.findIndex((task) => task.id === taskId);
      setTasks(() => {
        return arrayTasks.splice(idx, 1);
      });
    },
    [tasks]
  );

  const deleteProject = useCallback(
    (ProjectId: string) => {
      setProjects((prev) => {
        return prev.filter((project) => project.id !== ProjectId);
      });
    },
    [projects]
  );

  return useMemo(
    () => ({
      projects,
      addProject,
      findProject,
      addTask,
      deleteTask,
      deleteProject,
      editTitle,
      editStatus,
      editDescription,
      findTask,
      editProject,
    }),
    [
      projects,
      addProject,
      findProject,
      addTask,
      deleteTask,
      deleteProject,
      editTitle,
      editStatus,
      editDescription,
      findTask,
      editProject,
    ]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
