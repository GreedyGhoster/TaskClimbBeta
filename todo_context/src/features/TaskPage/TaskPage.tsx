import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../../hooks";
import { useState } from "react";
import { NotFound } from "../NotFound";

export function TaskPage() {
  const { projectId, taskTitle, taskId } = useParams<{
    projectId: string;
    taskTitle: string;
    taskId: string;
  }>();
  const { findProject, editDescription, findTask } = useTodo();
  const project = findProject(projectId!);

  // Костыль
  if (!project || !taskId || !taskTitle) {
    return <NotFound />;
  }

  const task = findTask(project.tasks, taskId);

  // Костыль
  if (!task) {
    return <NotFound />;
  }

  const [description, setDescription] = useState(task.description);

  const navigate = useNavigate();

  const GoBack = () => {
    navigate(`/${projectId}`);
  };

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
        <Typography variant="h4">{taskTitle}</Typography>
        <Button
          sx={{
            float: "right",
            margin: "auto",
            marginRight: 0,
          }}
          onClick={GoBack}
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
              taskId,
              project.tasks,
              taskTitle,
              description,
              task.status
            )
          }
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
