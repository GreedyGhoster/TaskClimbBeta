import { Box, List, TextField, Typography } from "@mui/material";
import { APP_SIDEBAR_WIDTH } from "./AppSidebar.constants";
import { useTodo } from "../../../../hooks";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoProjectFormValues } from "../../../../types";
import { useCallback, useState } from "react";
import { FormTextField } from "../../../../components/form";
import { useParams } from "react-router-dom";
import { AppProjectItem } from "./AppProjectItem";

export const AppSidebar = () => {
  const { projects, addProject } = useTodo();
  const { projectId } = useParams<{ projectId: string }>();
  const [searchTerm, setSearchTerm] = useState<string>("");

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
              placeholder="Add project"
            />
          </Box>
        </FormProvider>
        <Box
          sx={{
            marginTop: "2%",
          }}
          component={"form"}
        >
          <TextField
            inputProps={{ maxLength: 20 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            name={"title"}
            placeholder="Find project"
          />
        </Box>
        <List
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {projects
            .filter((val) => {
              if (
                searchTerm === "" ||
                val.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((project) => (
              <AppProjectItem
                key={project.id}
                project={project}
                projectId={projectId!}
              />
            ))}
        </List>
      </Box>
    </Box>
  );
};
