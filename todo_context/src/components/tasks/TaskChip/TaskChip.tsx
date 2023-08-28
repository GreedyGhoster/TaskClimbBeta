import { FC, useMemo } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { changeThemeStatus } from "../../../custom/theme/changetheme";
import { IToDoTask, ToDoTaskStatus } from "../../../types";
import { Chip } from "@mui/material";

interface Props {
  status: ToDoTaskStatus;
  task: IToDoTask;
}

const TaskChip: FC<Props> = ({ status, task }) => {
  const getColor = useMemo(() => {
    switch (status) {
      case ToDoTaskStatus.new:
        return "info";
      case ToDoTaskStatus.doing:
        return "secondary";
      case ToDoTaskStatus.done:
        return "success";
      default:
        return "default";
    }
  }, [status]);

  const getLabel = useMemo(() => {
    switch (status) {
      case ToDoTaskStatus.new:
        return "New";
      case ToDoTaskStatus.doing:
        return "Doing";
      case ToDoTaskStatus.done:
        return "Done";
      default:
        return "-";
    }
  }, [status]);

  return (
    <ThemeProvider theme={changeThemeStatus}>
      <Chip
        label={getLabel}
        color={getColor}
        variant="outlined"
        size="medium"
        onClick={() => console.log(task)}
      />
    </ThemeProvider>
  );
};

export default TaskChip;
