import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

export function SidebarProject({ project }: any, { projectId }: any) {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const handleDelete = () => {
    if (`/${project.id}`) {
      setDeleteButtonVisible(true);
    } else if (`/${!project.id}`) {
      setDeleteButtonVisible(false);
    }
  };

  return (
    <div>
      <ListItem key={project.id}>
        <ListItemButton
          onClick={() => handleDelete()}
          selected={project.id === projectId}
          href={project.id}
        >
          <ListItemText primary={project.title} />
        </ListItemButton>
        <DeleteForeverIcon
          sx={deleteButtonVisible ? { display: "block" } : { display: "none" }}
          color="error"
        />
      </ListItem>
    </div>
  );
}
