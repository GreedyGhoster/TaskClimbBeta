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

  const addTask = useCallback((projectId: string, taskName: string) => {
    setProjects((prev) => {
      const next = [...prev];
      const project = next.find((project) => project.id === projectId);
      if (project) {
        project.tasks = [{ title: taskName, id: uuidv4() }, ...project.tasks];
      }
      return next;
    });
  }, []);

  return useMemo(
    () => ({
      projects,
      addProject,
      findProject,
      addTask,
    }),
    [projects, addProject, findProject, addTask]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
