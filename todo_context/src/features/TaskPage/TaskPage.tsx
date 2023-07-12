import { useParams } from "react-router-dom";

export function TaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();

  return (
    <div>
      {projectId} - {taskId}
    </div>
  );
}
