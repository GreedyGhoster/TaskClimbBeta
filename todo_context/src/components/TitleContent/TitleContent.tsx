import Box from "@mui/material/Box";

export function TitleContent() {
  return (
    <Box
      sx={{
        fontSize: "2rem",
        letterSpacing: "1px",
        textAlign: "center",
      }}
      component={"div"}
    >
      <Box
        sx={{
          height: "3.2rem",
        }}
        component={"div"}
      >
        <Box
          sx={{
            fontWeight: "normal",
          }}
          component={"h2"}
        >
          ToDo List
        </Box>
      </Box>
      <span>Just do it!</span>
    </Box>
  );
}
