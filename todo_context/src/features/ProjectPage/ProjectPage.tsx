import { useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import { Box, List } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoTaskFormValues } from "../../types";
import { FormTextField } from "../../components/form";
import { useCallback } from "react";
import { TitleContent } from "../../components/TitleContent";
import { ProjectTask } from "../ProjectTask";

export function ProjectPage() {
  const { findProject, addTask } = useTodo();
  const { projectId } = useParams<{ projectId: string }>();
  const project = findProject(projectId!);
  const formMethods = useForm<AddToDoTaskFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const findFormMethods = useForm({
    defaultValues: {
      title: "",
    },
  });

  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoTaskFormValues) => {
      if (values.title.trim() !== "") {
        addTask(projectId!, values.title, "todo", "");
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
        <FormProvider {...findFormMethods}>
          <Box component={"form"}>
            <FormTextField
              inputProps={{ maxLength: 30 }}
              name={"title"}
              placeholder="Find the task"
            />
          </Box>
        </FormProvider>
        <FormProvider {...formMethods}>
          <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormTextField
              inputProps={{ maxLength: 43 }}
              name={"title"}
              placeholder="Add the task"
            />
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
        {project.tasks.length > 0 ? (
          <>
            {project.tasks.map((task) => (
              <ProjectTask key={task.id} task={task} projectId={projectId} />
            ))}
          </>
        ) : (
          <Box sx={{ textAlign: "center" }} component={"h2"}>
            No tasks
          </Box>
        )}
      </List>
    </Box>
  );
}
