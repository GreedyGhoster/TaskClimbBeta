import { useParams } from "react-router-dom";
import { useTodo } from "../../context";
import { NotFound } from "../NotFound";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoTaskFormValues } from "../../types";
import { FormTextField } from "../../components/form";
import { useCallback } from "react";

export function ProjectPage() {
  const { findProject, addTask } = useTodo();
  const { projectId } = useParams<{ projectId: string }>();
  const project = findProject(projectId!);
  const formMethods = useForm<AddToDoTaskFormValues>({
    defaultValues: {
      title: "",
    },
  });
  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoTaskFormValues) => {
      if (values.title.trim() !== "") {
        addTask(projectId!, values.title);
        reset({ title: "" });
      }
    },
    [addTask, reset, projectId]
  );

  if (!project) {
    return <NotFound />;
  }

  return (
    <Box>
      <FormProvider {...formMethods}>
        <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
          <FormTextField name={"title"} placeholder="add task" />
        </Box>
      </FormProvider>
      <List>
        {project.tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemButton href={`/tasks/${projectId}/${task.id}`}>
              <ListItemText primary={task.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
