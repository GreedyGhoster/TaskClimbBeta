import { useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import { TaskListItem } from "./TaskListItem";
import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

export function ProjectPage() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const { findProject, getTasksByProject } = useTodo();
  const { projectId } = useParams<{ projectId: string }>();
  const project = findProject(projectId);
  const tasks = getTasksByProject(projectId, searchTerm);

  const handleSearch = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, []);

  useEffect(() => {
    setSearchTerm(undefined);
  }, [projectId]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          marginTop: "1.5%",
        }}
        variant="h4"
      >
        {project.title}
      </Typography>
      <Box
        sx={{
          display: "inline-flex",
          gap: "1rem",
          textAlign: "center",
          width: "auto",
          margin: "auto",
          marginTop: "2.5%",
        }}
        component={"div"}
      >
        <SearchTaskForm projectId={project.id} onSearch={handleSearch} />
        <AddTaskForm projectId={project.id} />
      </Box>
      <Box
        sx={{
          width: "43%",
          height: "1.6rem",
          margin: "auto",
          marginTop: "2%",
          display: "inline-flex",
          borderBottom: "1px groove #ebebeb",
          fontSize: "1.3rem",
          textAlign: "center",
        }}
        component={"div"}
      >
        <Box
          sx={{
            height: "auto",
            width: "50%",
          }}
          component={"div"}
        >
          Task Name
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "20%",
          }}
          component={"div"}
        >
          Status
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "20%",
          }}
          component={"div"}
        >
          Edit
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "20%",
          }}
          component={"div"}
        >
          Delete
        </Box>
      </Box>
      <List
        sx={{
          width: "100%",
          paddingTop: "0px",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </>
        ) : (
          <Box sx={{ textAlign: "center" }} component={"h2"}>
            No tasks
          </Box>
        )}
      </List>
    </Box>
  );
}
