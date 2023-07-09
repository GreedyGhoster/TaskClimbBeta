import { AiOutlinePlusCircle } from "react-icons/ai";
import "./layouts.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="adding-project">
        <input type="text" placeholder="Enter the task" maxLength={15} />
        <AiOutlinePlusCircle className="adding-bar-img" />
      </div>
    </div>
  );
}
