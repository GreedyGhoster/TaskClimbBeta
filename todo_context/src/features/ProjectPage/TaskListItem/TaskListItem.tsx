import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {FC} from "react";
import {UseRenderModeProvider, useTodo} from "../../../hooks";
import {IToDoTask, RenderMode} from "../../../types";
import {RenderModeController} from "../../../components/ctrl";
import {EditTaskInlineForm} from "./EditTaskInlineForm";
import {TaskRoute} from "../../../routes";
import {IconButton, ListItemAvatar} from "@mui/material";
import {TaskChip} from "../../../components/tasks";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


interface Props {
  task: IToDoTask
}

const TaskListItem: FC<Props> = ({task}) => {
  const {deleteTask} = useTodo();

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
        }}>
        <RenderModeController
          renderView={(onChangeRenderMode) => (
            <ListItem
              component={'div'}
              secondaryAction={(
                <>
                  <IconButton
                    onClick={() => onChangeRenderMode(RenderMode.Edit)}
                    color="secondary"
                  >
                    <EditIcon/>
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    color="error"
                  >
                    <DeleteIcon/>
                  </IconButton>
                </>
              )}>
              <ListItemButton href={TaskRoute(task.projectId, task.id)}>
                <ListItemAvatar>
                  <TaskChip status={task.status}/>
                </ListItemAvatar>
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