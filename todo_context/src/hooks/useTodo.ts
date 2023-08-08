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

  const editStatus = useCallback(
    (taskId: string, arrayTasks: any[], title: string, newStatus: string) => {
      setTasks(() => {
        const idx = arrayTasks.findIndex((task) => task.id === taskId);
        return arrayTasks.splice(idx, 1, {
          title: title,
          id: taskId,
          status: newStatus,
        });
      });
    },
    []
  );

  const editTitle = useCallback(
    (taskId: string, arrayTasks: any[], newTitle: string, status: string) => {
      setTasks(() => {
        const idx = arrayTasks.findIndex((task) => task.id === taskId);
        return arrayTasks.splice(idx, 1, {
          title: newTitle,
          id: taskId,
          status: status,
        });
      });
      console.log(`${newTitle} - in useTodo`);
    },
    []
  );

  const deleteTask = useCallback(
    (arrayTasks: any[], taskId: string) => {
      const idx = arrayTasks.findIndex((task) => task.id === taskId);
      setTasks(() => {
        return arrayTasks.splice(idx, 1);
      });
      console.log("-------");
      console.log(`${tasks} - tasks`);
      console.log(`${arrayTasks} - arrayTasks`);
      console.log("-------");
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
    ]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
