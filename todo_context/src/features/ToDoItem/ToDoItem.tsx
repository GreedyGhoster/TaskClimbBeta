import { useState, useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdModeEditOutline } from "react-icons/md";
import { TaskContext } from "../ToDoForm/ToDoForm";

export default function Task() {
  const [status, setStatus] = useState("Todo");
  const [taskChange, setTaskChange] = useState(false);
  const [onChangeStatus, setOnChangeStatus] = useState(true);
  const [taskComplete, setTaskComplete] = useState(false);
  const [taskVisible, setTaskVisible] = useState(true);
  const [onTaskChanged, setOnTaskChanged] = useState(true);
  const defaultTask = useContext(TaskContext);
  let [newTask, setNewTask] = useState(defaultTask);
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
              {onTaskChanged ? defaultTask : newTask}
            </div>
          ) : (
            <div
              className="task-change"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  newTask.trim() !== ""
                    ? setTaskChange(!taskChange)
                    : setTaskChange(taskChange);
                }
              }}
            >
              <input
                placeholder="New task"
                value={newTask}
                type="text"
                maxLength={15}
                onChange={(e) => {
                  setOnTaskChanged(false);
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
              onClick={() => {
                newTask.trim() !== ""
                  ? setTaskChange(!taskChange)
                  : setTaskChange(taskChange);
              }}
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
