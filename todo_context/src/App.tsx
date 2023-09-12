import "./global.css";
import { AppRouter } from "./routes";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function App() {
  const matches = useMediaQuery("(min-width:1024px)");

  return (
    <>
      {matches ? (
        <AppRouter />
      ) : (
        <h1>Try opening on a wider screen (1024px and higher)</h1>
      )}
    </>
  );
}
