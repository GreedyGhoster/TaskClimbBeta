import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export function TaskPage() {
  const { projectId, taskTitle } = useParams<{
    projectId: string;
    taskTitle: string;
  }>();
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(`/${projectId}`);
  };

  console.log(taskTitle);

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
          marginTop: "2%",
          marginBottom: "1%",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Typography
          sx={{
            float: "left",
          }}
          variant="h4"
        >
          {taskTitle}
        </Typography>
        <Button
          sx={{
            float: "right",
            margin: "auto",
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
            clear: "left",
          }}
          multiline
          variant="standard"
          placeholder="Description"
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
