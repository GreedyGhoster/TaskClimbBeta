import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import { TaskChip } from "../../components/tasks";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export function TaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();
  const { findProject, findTask, editTask } = useTodo();

  const project = findProject(projectId);
  const task = findTask(projectId, taskId);

  const navigate = useNavigate();
  const [taskDescription, setTaskDescription] = useState(task?.description);

  const goBack = () => {
    navigate(`/${projectId}`);
  };

  if (!project || !task) {
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
        <Typography variant="h4">{task.title}</Typography>
        <Button
          sx={{
            float: "right",
            margin: "auto",
            marginRight: 0,
          }}
          onClick={goBack}
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
        <TaskChip status={task.status} />
        <TextField
          sx={{
            width: "100%",
          }}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
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
          onClick={() => editTask(task.id, task)}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
