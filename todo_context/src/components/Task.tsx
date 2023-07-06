import { useState, useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdModeEditOutline } from "react-icons/md";
import { TaskContext } from "./ToDo";

export default function Task() {
  const [status, setStatus] = useState("Todo");
  const [taskChange, setTaskChange] = useState(false);
  const [onChangeStatus, setOnChangeStatus] = useState(true);
  const [taskComplete, setTaskComplete] = useState(false);
  const [taskVisible, setTaskVisible] = useState(true);
  const [newTask, setNewTask] = useState("");
  const task = useContext(TaskContext);
  const ColorChange = () => {
    if (status === "Todo") {
      return "primary";
    } else if (status === "Doing") {
      return "secondary";
    } else {
      return "success";
    }
  };
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
  return (
    <>
      {taskVisible === true ? (
        <div className="task">
          {taskChange === false ? (
            <div className={taskComplete ? "task-do complete" : "task-do"}>
              {task}
            </div>
          ) : (
            <div className="task-change">
              <input
                placeholder={task}
                value={newTask}
                type="text"
                maxLength={15}
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
              />
            </div>
          )}

          <div className="status">
            <Button
              color={ColorChange()}
              variant="outlined"
              onClick={StatusChange}
            >
              {status}
            </Button>
          </div>
          <div className="edit">
            <MdModeEditOutline
              onClick={() => setTaskChange(!taskChange)}
              className="task-edit-icon"
            />
          </div>
          <div className="remove">
            <MdDeleteForever
              className="task-delete-icon"
              onClick={() => setTaskVisible(!taskVisible)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
