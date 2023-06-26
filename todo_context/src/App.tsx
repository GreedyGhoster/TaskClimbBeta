import "./Style.css";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Content />
    </div>
  );
}
