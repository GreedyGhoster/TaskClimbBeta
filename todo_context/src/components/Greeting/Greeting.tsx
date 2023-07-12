import Box from "@mui/material/Box";

export default function Greeting() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1.4rem",
      }}
      component={"div"}
    >
      <Box
        sx={{
          height: "4rem",
        }}
        component={"div"}
      >
        <Box sx={{}} component={"h2"}>
          Welcome
        </Box>
      </Box>

      <span>To get started, create a new project</span>
    </Box>
  );
}
