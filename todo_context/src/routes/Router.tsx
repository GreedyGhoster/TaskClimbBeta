import ToDoForm from "../features/ToDoForm";
import { Route, Routes } from "react-router-dom";
export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ToDoForm />} />
        <Route path="/:id" element={<ToDoForm />} />
      </Routes>
    </div>
  );
}
