import ToDoForm from "../ToDoForm";

export default function Content() {
  return (
    <div className="content-dark">
      <div className="titles-dark">
        <div className="title-1-dark">
          <h2>ToDo List</h2>
        </div>
        <span>Just do it!</span>
      </div>
      <ToDoForm />
    </div>
  );
}
