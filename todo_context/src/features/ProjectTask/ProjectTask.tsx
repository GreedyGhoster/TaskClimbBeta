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
import { NotFound } from "../NotFound";

export function ProjectTask({ task, projectId }: PropsForTask) {
  const { deleteTask, editTitle, editStatus, findProject } = useTodo();
  const project = findProject(projectId!);
  const [index, setIndex] = useState<number>(2);
  const [taskChanged, setTaskChanged] = useState<boolean>(true);
  const [taskComplete, setTaskComplete] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("doing");
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const [description] = useState<string>(task.description);

  const statuses: string[] = ["todo", "doing", "done"];

  const addEditTask = () => {
    task.title.trim() !== ""
      ? setTaskChanged(!taskChanged)
      : setTaskChanged(taskChanged);
  };

  const StatusChange = () => {
    setIndex((index + 1) % statuses.length);
    setStatus(statuses[index]);
    status === "done" ? setTaskComplete(true) : setTaskComplete(false);
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

  // useEffect(() => {
  //   console.log(`${newTitle} - in ProjectTask`);
  // }, [newTitle]);

  useEffect(() => {
    console.log(task);
  }, [task.description]);

  if (!project) {
    return <NotFound />;
  }

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
            href={`/${projectId}/${task.title}/${task.id}`}
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
              editTitle(task.id, project.tasks, newTitle, description);
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
          onClick={() =>
            editStatus(task.id, project.tasks, task.title, status, description)
          }
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
            onClick={() => deleteTask(project.tasks, task.id)}
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
