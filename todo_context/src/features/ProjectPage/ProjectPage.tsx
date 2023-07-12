import { useParams } from "react-router-dom";
import { useTodo } from "../../context";
import { NotFound } from "../NotFound";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoTaskFormValues } from "../../types";
import { FormTextField } from "../../components/form";
import { useCallback } from "react";
import TitleContent from "../../components/TitleContent";
import "./projectpage.css";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TitleContent />
      <Box
        sx={{
          display: "inline-flex",
          gap: "1rem",
          textAlign: "center",
          width: "auto",
          margin: "auto",
          marginTop: "3%",
        }}
        component={"div"}
      >
        <FormProvider {...formMethods}>
          <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormTextField name={"title"} placeholder="Find the task" />
          </Box>
        </FormProvider>
        <FormProvider {...formMethods}>
          <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormTextField name={"title"} placeholder="Add the task" />
          </Box>
        </FormProvider>
      </Box>
      <Box
        sx={{
          width: "43%",
          height: "1.6rem",
          margin: "auto",
          marginTop: "2%",
          display: "inline-flex",
          borderBottom: "1px groove #ebebeb",
          fontSize: "1.3rem",
          textAlign: "center",
        }}
        component={"div"}
      >
        <Box
          sx={{
            height: "auto",
            width: "50%",
          }}
          component={"div"}
        >
          Task Name
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "20%",
          }}
          component={"div"}
        >
          Status
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "20%",
          }}
          component={"div"}
        >
          Edit
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "20%",
          }}
          component={"div"}
        >
          Delete
        </Box>
      </Box>
      <List
        sx={{
          width: "100%",
          paddingTop: "0px",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {project.tasks.map((task) => (
          <ListItem
            sx={{
              height: "3rem",
              margin: "auto",
              width: "43%",
              padding: "0",
              borderBottom: "1px groove #343739",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
            key={task.id}
          >
            <ListItemButton
              sx={{
                textAlign: "center",
                padding: "0",
                width: "50%",
              }}
              href={`/tasks/${projectId}/${task.id}`}
            >
              <ListItemText
                sx={{
                  padding: "0",
                }}
                primary={task.title}
              />
            </ListItemButton>
            <Box
              sx={{
                height: "auto",
                width: "20%",
                margin: "auto",
                padding: "0",
              }}
              component={"div"}
            >
              <Button variant="outlined" color="primary">
                Status
              </Button>
            </Box>
            <Box
              sx={{
                height: "auto",
                width: "20%",
                margin: "auto",
                padding: "0",
              }}
              component={"div"}
            >
              <Button variant="outlined" color="secondary">
                Edit
              </Button>
            </Box>
            <Box
              sx={{
                height: "auto",
                width: "20%",
                margin: "auto",
                padding: "0",
              }}
              component={"div"}
            >
              <Button variant="outlined" color="secondary">
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
