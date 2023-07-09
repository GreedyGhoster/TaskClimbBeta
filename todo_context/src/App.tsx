import "./Style.css";
import Content from "./features/layouts/Content";
import Sidebar from "./features/layouts/Sidebar";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Content />
    </div>
  );
}
