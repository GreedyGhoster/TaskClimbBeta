import ToDoForm from "../ToDoForm";
import Title from "../../components/Title";
import "./layouts.css";

export default function Content() {
  return (
    <div className="content">
      <Title />
      <ToDoForm />
    </div>
  );
}
