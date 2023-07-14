import { Box, List, Typography } from "@mui/material";
import { APP_SIDEBAR_WIDTH } from "./AppSidebar.constants";
import { useTodo } from "../../../../context";
import { SidebarProject } from "../SidebarProject";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoProjectFormValues } from "../../../../types";
import { useCallback } from "react";
import { FormTextField } from "../../../../components/form";
import { useParams } from "react-router-dom";

export const AppSidebar = () => {
  const { projects, addProject } = useTodo();
  const { projectId } = useParams<{ projectId: string }>();
  const formMethods = useForm<AddToDoProjectFormValues>({
    defaultValues: {
      title: "",
    },
  });
  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoProjectFormValues) => {
      if (values.title.trim() !== "") {
        addProject(values.title);
        reset({ title: "" });
      }
    },
    [addProject, reset]
  );

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        width: APP_SIDEBAR_WIDTH,
        maxWidth: APP_SIDEBAR_WIDTH,
        backgroundColor: "#373737",
        zIndex: 1,
        overflow: "auto",
      }}
      component={"nav"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 2,
        }}
      >
        <Typography variant="h6">Projects</Typography>
        <FormProvider {...formMethods}>
          <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormTextField
              inputProps={{ maxLength: 20 }}
              name="title"
              placeholder="add project"
            />
          </Box>
        </FormProvider>
        <List
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {projects.map((project) => (
            <SidebarProject
              key={project.id}
              project={project}
              projectId={projectId}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
};
