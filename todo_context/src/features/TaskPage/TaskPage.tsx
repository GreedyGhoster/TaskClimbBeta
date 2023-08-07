import { Box, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export function TaskPage() {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(`/${projectId}`);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        padding: "0",
        marginTop: "0",
      }}
    >
      <Button onClick={GoBack} variant="outlined">
        Back
      </Button>
      <Typography
        sx={{
          color: "#9c9c9c",
        }}
        variant="h6"
      >
        Описание
      </Typography>
    </Box>
  );
}
