import ToDo from "./ToDo";

export default function Content() {
  return (
    <div className="content-dark">
      <div className="titles">
        <div className="title-1">
          <h2>ToDo List</h2>
        </div>
        <span>Just do it!</span>
      </div>
      <ToDo />
    </div>
  );
}
