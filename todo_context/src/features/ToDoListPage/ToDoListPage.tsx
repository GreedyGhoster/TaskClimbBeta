// import ToDoPage from "../ToDoPage/ToDoPage";
import { useState } from "react";
import "./todolistpage.css";
import { Link } from "react-router-dom";

export default function ToDoListPage() {
  const [projects, setProjects]: [string[], any] = useState([]);
  const [project, setProject]: [string, any] = useState("");
  const addTask = (project: string) => {
    if (project.trim() !== "") {
      setProjects([...projects, project]);
      setProject("");
    }
  };
  return (
    <div className="projects">
      <input
        className="adding-project"
        value={project}
        type="text"
        placeholder="Enter the project"
        maxLength={15}
        onChange={(e) => setProject(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            addTask(project);
          }
        }}
      />
      <div className="pages">
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          {projects.map((project, index) => (
            <li key={index}>
              <Link className="link" to={"/" + project.toLocaleLowerCase()}>
                {project}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
