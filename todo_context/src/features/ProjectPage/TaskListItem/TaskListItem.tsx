import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC } from "react";
import { UseRenderModeProvider, useTodo } from "../../../hooks";
import { IToDoTask, RenderMode } from "../../../types";
import { RenderModeController } from "../../../components/ctrl";
import { EditTaskInlineForm } from "./EditTaskInlineForm";
import { TaskRoute } from "../../../routes";
import { TaskChip } from "../../../components/tasks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

interface Props {
  task: IToDoTask;
}

const TaskListItem: FC<Props> = ({ task }) => {
  const { deleteTask } = useTodo();

  return (
    <UseRenderModeProvider defaultMode={RenderMode.View}>
      <Box
        sx={{
          height: "3rem",
          margin: "auto",
          width: "43%",
          padding: "0",
          borderBottom: "1px groove #343739",
          fontSize: "1.3rem",
          textAlign: "center",
        }}
      >
        <RenderModeController
          renderView={(onChangeRenderMode) => (
            <ListItem
              sx={{
                padding: "0",
              }}
              component={"div"}
            >
              <ListItemButton
                sx={{
                  textAlign: "center",
                }}
                href={TaskRoute(task.projectId, task.id)}
              >
                <ListItemText
                  sx={
                    task.status === "done"
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
                  secondary={task.description}
                />
              </ListItemButton>
              <Box
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-evenly",
                  width: "35%",
                }}
              >
                <Box
                  sx={{
                    marginTop: "4px",
                    width: "4rem",
                  }}
                >
                  <TaskChip status={task.status} />
                </Box>
                <Box>
                  <IconButton
                    onClick={() => onChangeRenderMode(RenderMode.Edit)}
                    color="secondary"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton onClick={() => deleteTask(task.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          )}
          renderEdit={(onChangeRenderMode) => (
            <EditTaskInlineForm
              task={task}
              onCancel={() => onChangeRenderMode(RenderMode.View)}
            />
          )}
        />
      </Box>
    </UseRenderModeProvider>
  );
};

export default TaskListItem;
