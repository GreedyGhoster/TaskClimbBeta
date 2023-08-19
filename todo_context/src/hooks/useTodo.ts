import constate from "constate";
import {useCallback, useMemo, useState} from "react";
import {AddToDoTaskFormValues, EditToDoTaskFormValues, IToDoProject, IToDoTask} from "../types";
import {v4 as uuidv4} from "uuid";
import _orderBy from "lodash/orderBy";

function useTodoFunc() {
  const [projects, setProjects] = useState<IToDoProject[]>([
    {id: "home", title: "Home"},
  ]);

  const [tasks, setTasks] = useState<IToDoTask[]>([])

  const addProject = useCallback((projectName: string) => {
    setProjects((prev) => [
      {id: uuidv4(), title: projectName},
      ...prev,
    ]);
  }, []);

  const findProject = useCallback(
    (projectId?: string) => {
      return projectId
        ? projects.find((x) => x.id === projectId)
        : undefined;
    },
    [projects]
  );

  const getTasksByProject = useCallback((projectId?: string, searchTerm?: string) => {
    let filteredTasks = tasks;
    // поиск по названию
    if (searchTerm) {
      filteredTasks = tasks.filter(x => x.title.includes(searchTerm));
    }

    return _orderBy(filteredTasks
        .filter(x => x.projectId === projectId)
      , ['createdAt'], ['desc'])
  }, [tasks])

  const findTask = useCallback(
    (projectId?: string, taskId?: string) => {
      return tasks.find(x => x.id === taskId && x.projectId === projectId);
    },
    [tasks]
  );

  const addTask = useCallback((projectId: string, newTask: AddToDoTaskFormValues,) => {
      setTasks((prev) => {
        return [
          {
            id: uuidv4(),
            projectId: projectId,
            createdAt: new Date(),
            ...newTask,
          },
          ...prev
        ]
      });
    },
    []
  );

  const editTask = useCallback((taskId: string, editingTask: EditToDoTaskFormValues) => {
      setTasks((prev) => {
        const next = [...prev]
        const task = next.find((x) => x.id === taskId);
        if (!task) {
          console.log(`Задача ${taskId} не найдена`)
          return prev
        } else {
          task.title = editingTask.title;
          task.status = editingTask.status;
          task.description = editingTask.description;
          return next
        }
      });
    },
    []
  );

  const editProject = useCallback(
    (projectId: string, newTitle: string) => {
      setProjects((prev) => {
        const next = [...prev]
        const project = next.find((x) => x.id === projectId);
        if (!project) {
          console.log(`Проект ${projectId} не найден`)
          return prev
        } else {
          project.title = newTitle;
          return next
        }
      });
    },
    []
  );

  const deleteTask = useCallback((taskId: string) => {
      setTasks(prev => {
        return prev.filter((x) => x.id !== taskId);
      });
    },
    []
  );

  const deleteProject = useCallback((projectId: string) => {
      setProjects((prev) => {
        return prev.filter((project) => project.id !== projectId);
      });
    },
    []
  );

  return useMemo(
    () => ({
      projects,
      addProject,
      findProject,
      addTask,
      deleteTask,
      deleteProject,
      editTask,
      findTask,
      editProject,
      getTasksByProject,
    }),
    [
      projects,
      addProject,
      findProject,
      addTask,
      deleteTask,
      deleteProject,
      editTask,
      findTask,
      editProject,
      getTasksByProject,
    ]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
