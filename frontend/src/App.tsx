import "./styles/App.css";
import TodoListForm from "./components/Todo/TodoListForm";


function App() {
  return (
    <>
    

      <div className="relative mx-4">
        <h1 className="text-[#B99800] text-2xl font-bold mb-9 ">Tasklist</h1>

<TodoListForm />

       


      </div>
    </>
  );
}

export default App;
