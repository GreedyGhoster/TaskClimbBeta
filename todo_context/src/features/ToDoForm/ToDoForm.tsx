import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useMemo } from "react";
import { TaskContext } from "../../context/TaskContext";
import ToDoItem from "../ToDoItem";
import "./todoform.css";

export default function ToDoForm() {
  const [todos, setTodos]: [string[], any] = useState([]);
  const [query, setQuery] = useState("");
  const [todo, setTodo]: [string, any] = useState("");
  const addTask = (todo: string) => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  const filteredItems = useMemo(() => {
    return todos.filter((item) => {
      return item.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }, [todos, query]);

  return (
    <div className="todo">
      <div className="tools">
        <div className="search-bar">
          <input
            type="search"
            value={query}
            placeholder="Find the task"
            maxLength={15}
            onChange={(e) => setQuery(e.target.value)}
          />
          <AiOutlineSearch className="search-bar-img" />
        </div>
        <div
          className="adding-bar"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addTask(todo);
            }
          }}
        >
          <input
            // BUG: Поиск ищет по старому значению в массиве, а новое значение игнорит
            // BUG: После поиска новое значение меняется на старое значение
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
      </div>
      <br />
      <div className="task-line">
        <div className="task-name">Task Name</div>
        <div className="status">Status</div>
        <div className="edit">Edit</div>
        <div className="remove">Remove</div>
      </div>
      <div className="tasks">
        {todos.length > 0 ? (
          <>
            {filteredItems.map((task, index) => (
              <TaskContext.Provider key={index} value={task}>
                <ToDoItem />
              </TaskContext.Provider>
            ))}
          </>
        ) : (
          <h2 className="empty-tasks">No tasks</h2>
        )}
      </div>
    </div>
  );
}