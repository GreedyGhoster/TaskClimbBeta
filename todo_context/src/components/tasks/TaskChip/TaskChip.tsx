import {FC, useMemo} from 'react';

import {ToDoTaskStatus} from "../../../types";
import {Chip} from "@mui/material";

interface Props {
  status: ToDoTaskStatus;
}

const TaskChip: FC<Props> = ({status}) => {

  const getColor = useMemo(() => {
    switch (status) {
      case ToDoTaskStatus.new:
        return 'default';
      case ToDoTaskStatus.doing:
        return 'info';
      case ToDoTaskStatus.done:
        return 'success';
      default:
        return 'default'
    }
  }, [status])

  const getLabel = useMemo(() => {
    switch (status) {
      case ToDoTaskStatus.new:
        return 'Новая';
      case ToDoTaskStatus.doing:
        return 'В работе';
      case ToDoTaskStatus.done:
        return 'Завершена';
      default:
        return '-'
    }
  }, [status])

  return (
    <Chip label={getLabel} color={getColor}/>
  );
};

export default TaskChip;