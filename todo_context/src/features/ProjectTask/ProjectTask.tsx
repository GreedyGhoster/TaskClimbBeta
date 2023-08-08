import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { TextField, ThemeProvider } from "@mui/material";
import { changeTheme } from "../../custom/theme/changetheme";
import { useTodo } from "../../hooks";
import { PropsForTask } from "../../types";

export function ProjectTask({ task, projectId, getStatus }: PropsForTask) {
  const { deleteTask, projects, editTitle, editStatus } = useTodo();
  const [taskChanged, setTaskChanged] = useState<boolean>(true);
  const [onChangeStatus, setOnChangeStatus] = useState<boolean>(true);
  const [taskComplete, setTaskComplete] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("doing");
  const [newTitle, setNewTitle] = useState<string>(task.title);

  const addEditTask = () => {
    task.title.trim() !== ""
      ? setTaskChanged(!taskChanged)
      : setTaskChanged(taskChanged);
  };

  const StatusChange = () => {
    setOnChangeStatus(!onChangeStatus);
    if (onChangeStatus === true) {
      setTaskComplete(false);
      setStatus("done");
    } else {
      setTaskComplete(true);
      setStatus("doing");
    }
  };

  const ColorChange = () => {
    if (task.status === "todo") {
      return "primary";
    } else if (task.status === "doing") {
      return "secondary";
    } else {
      return "success";
    }
  };

  useEffect(() => {
    getStatus(status);
  }, [status]);

  useEffect(() => {
    console.log(`${newTitle} - in ProjectTask`);
  }, [newTitle]);

  useEffect(() => {
    console.log(task);
  }, [status]);

  return (
    <>
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
        {taskChanged ? (
          <ListItemButton
            sx={{
              textAlign: "center",
              padding: "0",
              width: "50%",
              overflowWrap: "break-word",
            }}
            href={`/${projectId}/${task.id}`}
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
        ) : (
          <TextField
            sx={{
              width: "50%",
            }}
            variant="standard"
            color="secondary"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              editTitle(
                task.id,
                projects.map((project) => project.tasks)[0],
                newTitle,
                status
              );
            }}
            onKeyDown={(e: any) => {
              e.key === "Enter" && e.target.value.trim() !== ""
                ? addEditTask()
                : null;
            }}
          />
        )}

        <Box
          sx={{
            height: "auto",
            width: "20%",
            margin: "auto",
            padding: "0",
          }}
          component={"div"}
          onClick={() => {
            editStatus(
              task.id,
              projects.map((project) => project.tasks)[0],
              task.title,
              status
            );
            getStatus(status);
          }}
        >
          <Button
            variant="outlined"
            color={ColorChange()}
            onClick={StatusChange}
          >
            {task.status}
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
            <Button
              variant="outlined"
              onClick={() => addEditTask()}
              color="secondary"
            >
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
            onClick={() =>
              deleteTask(projects.map((project) => project.tasks)[0], task.id)
            }
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </ListItem>
    </>
  );
}
