import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { changeTheme } from "../../custom/theme/changetheme";
import { useTodo } from "../../context";

export function ProjectTask({ task, projectId }: any) {
  const [taskVisible, setTaskVisible] = useState(true);
  const { deleteTask, projects } = useTodo();
  const [onChangeStatus, setOnChangeStatus] = useState(true);
  const [taskComplete, setTaskComplete] = useState(false);
  const [status, setStatus] = useState("Todo");

  const StatusChange = () => {
    setOnChangeStatus(!onChangeStatus);
    if (onChangeStatus === true) {
      setTaskComplete(false);
      setStatus("Doing");
    } else {
      setTaskComplete(true);
      setStatus("Done");
    }
  };

  const ColorChange = () => {
    if (status === "Todo") {
      return "primary";
    } else if (status === "Doing") {
      return "secondary";
    } else {
      return "success";
    }
  };

  return (
    <>
      {taskVisible && (
        <div>
          <ListItem
            sx={{
              height: "3rem",
              margin: "auto",
              width: "43%",
              padding: "0",
              borderBottom: "1px groove #343739",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
            key={task.id}
          >
            <ListItemButton
              sx={{
                textAlign: "center",
                padding: "0",
                width: "50%",
              }}
              href={`/tasks/${projectId}/${task.id}`}
            >
              <ListItemText
                sx={
                  taskComplete
                    ? {
                        padding: "0",
                        color: "#919191",
                        textDecoration: "line-through",
                      }
                    : {
                        padding: "0",
                      }
                }
                primary={task.title}
              />
            </ListItemButton>
            <Box
              sx={{
                height: "auto",
                width: "20%",
                margin: "auto",
                padding: "0",
              }}
              component={"div"}
            >
              <Button
                variant="outlined"
                color={ColorChange()}
                onClick={StatusChange}
              >
                {status}
              </Button>
            </Box>
            <ThemeProvider theme={changeTheme}>
              <Box
                sx={{
                  height: "auto",
                  width: "20%",
                  margin: "auto",
                  padding: "0",
                }}
                component={"div"}
              >
                <Button variant="outlined" color="secondary">
                  Edit
                </Button>
              </Box>
            </ThemeProvider>
            <Box
              sx={{
                height: "auto",
                width: "20%",
                margin: "auto",
                padding: "0",
              }}
              component={"div"}
            >
              <Button
                onClick={() => {
                  deleteTask(
                    projects.map((project) => project.tasks),
                    task.id
                  );
                  setTaskVisible(false);
                }}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        </div>
      )}
    </>
  );
}
