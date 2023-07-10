import TitleSidebar from "../../components/TitleSidebar/TitleSidebar";
import ToDoListPage from "../ToDoListPage/ToDoListPage";
import "./layouts.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <TitleSidebar />
      <ToDoListPage />
    </div>
  );
}
