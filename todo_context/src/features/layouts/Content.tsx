import TitleContent from "../../components/TitleContent";
import Router from "../../routes/Router";
import "./layouts.css";

export default function Content() {
  return (
    <div className="content">
      <TitleContent />
      <Router />
    </div>
  );
}
