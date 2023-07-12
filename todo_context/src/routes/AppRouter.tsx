import ToDoForm from "../features/ToDoForm";
import Greeting from "../components/Greeting/Greeting";
import { NotFound } from "../features/NotFound";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../features/layouts/AppLayout";
import { ProjectPage } from "../features/ProjectPage";
import { TaskPage } from "../features/TaskPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Greeting />} />
        <Route path=":projectId" element={<ProjectPage />} />
        <Route path="tasks/:projectId/:taskId" element={<TaskPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
