import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { VscColorMode } from "react-icons/vsc";
import { useState, createContext } from "react";
export const TaskContext = createContext("");
import Task from "./Task";
export default function ToDo() {
  const [todos, setTodos]: [any[], any] = useState([]);
  const [todo, setTodo]: [string, any] = useState("");
  const addTask = (todo: string) => {
    if (todo !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };
  return (
    <div className="todo">
      <div className="tools">
        <div
          className="search-bar"
          // onKeyDown={(ev) => {
          //   if (ev.keyCode == 13) {
          //     addTask(todo);
          //   }
          // }}
        >
          <input
            type="text"
            placeholder="Find the task"
            maxLength={15}
            // value={todo}
            // onChange={(e) => setTodo(e.target.value)}
          />
          <AiOutlineSearch
            className="search-bar-img"
            // onClick={() => addTask(todo)}
          />
        </div>
        <div
          className="adding-bar"
          onKeyDown={(ev) => {
            if (ev.keyCode == 13) {
              addTask(todo);
            }
          }}
        >
          <input
            type="text"
            placeholder="Enter the task"
            maxLength={15}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <AiOutlinePlusCircle
            className="adding-bar-img"
            onClick={() => addTask(todo)}
          />
        </div>
        <div className="theme-changer">
          <VscColorMode className="theme-changer-img" />
        </div>
      </div>
      <br />
      <div className="task-line">
        <div className="task-name">Task Name</div>
        <div className="status">Status</div>
        <div className="edit">Edit</div>
        <div className="remove">Remove</div>
      </div>
      <div className="tasks">
        {todos.map((task, index) => (
          <TaskContext.Provider key={index} value={task}>
            <Task />
          </TaskContext.Provider>
        ))}
      </div>
    </div>
  );
}
