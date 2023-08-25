import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import { TaskChip } from "../../components/tasks";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export function TaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();
  const { findProject, findTask } = useTodo();

  const project = findProject(projectId);
  const task = findTask(projectId, taskId);
  const navigate = useNavigate();

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
        <TaskChip status={task.status} />
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
    </Box>
  );
}
