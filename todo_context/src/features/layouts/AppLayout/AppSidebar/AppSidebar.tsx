import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { APP_SIDEBAR_WIDTH } from "./AppSidebar.constants";
import { useTodo } from "../../../../hooks";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoProjectFormValues } from "../../../../types";
import { useCallback, useState } from "react";
import { FormTextField } from "../../../../components/form";
import { useParams } from "react-router-dom";

export const AppSidebar = () => {
  const { projects, addProject, deleteProject } = useTodo();
  const [searchTerm, setSearchTerm] = useState<string>("");
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
              <ListItem key={project.id}>
                <ListItemButton
                  selected={project.id === projectId}
                  href={project.id}
                >
                  <ListItemText primary={project.title} />
                </ListItemButton>
                {project.id !== "home" ? (
                  <DeleteForeverIcon
                    onClick={() => deleteProject(project.id)}
                    color="error"
                  />
                ) : (
                  <></>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};
