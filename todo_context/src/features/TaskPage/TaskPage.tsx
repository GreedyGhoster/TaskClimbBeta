import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../../hooks";
import { useState } from "react";
import { NotFound } from "../NotFound";

export function TaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();
  const { findProject, editDescription, findTask } = useTodo();
  const project = findProject(projectId!);
  const task = findTask(project!.tasks, taskId!);
  const [description, setDescription] = useState(task!.description);

  const navigate = useNavigate();

  const GoBack = () => {
    navigate(`/${projectId}`);
  };

  if (!project) {
    return <NotFound />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#262626",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        width: "40%",
        height: "auto",
        margin: "auto",
        padding: "0",
        marginTop: "3%",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          marginTop: "2%",
          marginBottom: "1%",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Typography variant="h4">{task!.title}</Typography>
        <Button
          sx={{
            float: "right",
            margin: "auto",
            marginRight: 0,
          }}
          onClick={() => {
            GoBack();
            editDescription(
              taskId!,
              project.tasks,
              task!.title,
              description,
              task!.status
            );
          }}
          variant="outlined"
        >
          Back
        </Button>
      </Box>
      <Box
        sx={{
          width: "85%",
          alignSelf: "center",
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          spellCheck="false"
          variant="standard"
          placeholder="Description in several rows"
          multiline
        />
        <Button
          sx={{
            float: "right",
            marginBottom: "2%",
            marginTop: "2%",
            marginRight: "1%",
          }}
          color="success"
          variant="outlined"
          onClick={() =>
            editDescription(
              taskId!,
              project.tasks,
              task!.title,
              description,
              task!.status
            )
          }
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
