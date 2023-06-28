import { useState, useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import Button from "@mui/material/Button";
import { MdModeEditOutline } from "react-icons/md";
import { TaskContext } from "./ToDo";
export default function Task() {
  const [taskComplete, setTaskComplete] = useState(false);
  const [taskVisible, setTaskVisible] = useState(true);
  const task = useContext(TaskContext);
  return (
    <>
      {taskVisible === true ? (
        <div className="task-form">
          <div className="task">
            <div className="task-do">
              <h3
                className={
                  taskComplete ? "task-do-text complete" : "task-do-text"
                }
              >
                {task}
              </h3>
            </div>
            <div className="button-status-form">
              <Button color="secondary" variant="outlined">
                Todo
              </Button>
            </div>

            <div className="task-edit-form">
              <MdModeEditOutline
                onClick={() => setTaskComplete(!taskComplete)}
                className="task-edit-icon"
              />
            </div>
            <div className="task-delete-form">
              <MdDeleteForever
                className="task-delete-icon"
                onClick={() => setTaskVisible(!taskVisible)}
              />{" "}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
