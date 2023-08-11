import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../../hooks";
import { useState } from "react";

export function TaskPage() {
  const { projectId, taskTitle } = useParams<{
    projectId: string;
    taskTitle: string;
  }>();
  const { findProject, editDescription } = useTodo();
  const project = findProject(projectId!);
  const [description, setDescription] = useState(
    project?.tasks.map((task) => task.description)
  );

  console.log(description);

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
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
