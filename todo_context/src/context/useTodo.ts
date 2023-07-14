import constate from "constate";
import { useCallback, useMemo, useState } from "react";
import { IToDoProject } from "../types";
import { v4 as uuidv4 } from "uuid";

function useTodoFunc() {
  const [projects, setProjects] = useState<IToDoProject[]>([
    { id: "home", title: "Home", tasks: [] },
  ]);
  const addProject = useCallback((projectName: string) => {
    setProjects((prev) => [
      { id: uuidv4(), title: projectName, tasks: [] },
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
          project.tasks = [
            { title: taskName, id: uuidv4(), status: status },
            ...project.tasks,
          ];
        }
        return next;
      });
    },
    []
  );

  const deleteTask = useCallback((arrayTasks: any, taskIndex: string) => {
    const idx = arrayTasks.indexOf(taskIndex);
    const deletedTasks = arrayTasks.splice(idx, 1);
    return deletedTasks;
  }, []);

  const editTask = useCallback(
    (arrayTasks: any, taskIndex: string, newTitle: string, status: string) => {
      const idx = arrayTasks.indexOf(taskIndex);
      delete arrayTasks[idx];
      arrayTasks[idx] = { id: taskIndex, title: newTitle, status: status };
    },
    []
  );

  return useMemo(
    () => ({
      projects,
      addProject,
      editTask,
      findProject,
      addTask,
      deleteTask,
    }),
    [projects, addProject, editTask, findProject, addTask, deleteTask]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
