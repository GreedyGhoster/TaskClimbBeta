import Content from "./features/layouts/Content";
import Sidebar from "./features/layouts/Sidebar";
import "./global.css";

export default function App() {
  return (
    <main>
      <Sidebar />
      <Content />
    </main>
  );
}
