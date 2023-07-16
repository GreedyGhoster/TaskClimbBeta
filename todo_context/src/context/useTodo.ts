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

  const addTask = useCallback(
    (projectId: string, taskName: string, status: string) => {
      setProjects((prev) => {
        const next = [...prev];
        const project = next.find((project) => project.id === projectId);
        if (project) {
          setTasks(
            (project.tasks = [
              { title: taskName, id: uuidv4(), status: status },

              ...project.tasks,
            ])
          );
        }
        return next;
      });
    },
    []
  );

  const deleteTask = useCallback(
    (arrayTasks: any[], taskId: any) => {
      const idx = arrayTasks.findIndex((task) => task.id === taskId);
      setTasks(() => {
        return arrayTasks.splice(idx, 1);
      });
      console.log(arrayTasks);
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
    }),
    [projects, addProject, findProject, addTask, deleteTask, deleteProject]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
