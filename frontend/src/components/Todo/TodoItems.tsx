import React, { useState, useEffect } from "react";
import { ITodo } from "../../types/types";
import axios from "axios";
import Fill from "../Fill";
import { FaTrashAlt } from "react-icons/fa";
import daysjs from "dayjs";
import { fetchData } from "../../services/apiService";

const TodoItems: React.FC<{
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  onTaskDelete: (taskId: number) => void;
}> = ({ todos, setTodos, onTaskDelete }) => {
  const [Completed, setCompleted] = useState(todos.map((todo) => todo.completed));
  console.log("completed:", Completed);

  
  const [showButtons, setShowButtons] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleButtons = (taskId: number) => {
    setShowButtons((prevShowButtons) => {
      const updatedShowButtons = { ...prevShowButtons };

      Object.keys(updatedShowButtons).forEach((key) => {
        const otherTaskId = parseInt(key, 10);
        if (otherTaskId !== taskId) {
          updatedShowButtons[otherTaskId] = false;
        }
      });

      updatedShowButtons[taskId] = !updatedShowButtons[taskId];
      return updatedShowButtons;
    });
  };

  const [isChecked, setIsChecked] = useState(
    todos.reduce((acc, todo) => {
      acc[todo.id] = todo.completed;
      return acc;
    }, {} as { [key: string]: boolean }) );

  
  const handleCompleted = async (task: ITodo) => {
    try {
      // Send the update to the server
      await submitCompleted(task.id, !task.completed);
  
      // Toggle the completed status locally
      setIsChecked((prevChecked) => ({
        ...prevChecked,
        [task.id]: !prevChecked[task.id],
      }));
    } catch (error) {
      console.error("Error:", error); } };


  //update
  const submitCompleted = async (
    todoId: number,
    newCompletedStatus: boolean
  ) => {
    console.log("Submitting update:", todoId, newCompletedStatus);
   
    try {
      const response = await axios.put(
        `https://backend-production-7211.up.railway.app/api/tasks/${todoId}/`,
        { completed: newCompletedStatus,  });

      const updatedTask = response.data;
      console.log("Updated Task:", updatedTask);

      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) =>
          todo.id === todoId
            ? { ...todo, completed: updatedTask.completed }
            : todo
        );

        const index = updatedTodos.findIndex((todo) => todo.id === todoId);
        updatedTodos.unshift(updatedTodos.splice(index, 1)[0]);

        setCompleted(updatedTodos.map((todo) => todo.completed));
        return updatedTodos;

 });
    } catch (error) {
      console.error("Error:", error); } };

 
useEffect(() => {
  const fetchDataAndUpdateState = async () => {
    try {
      const data = await fetchData();
      const completedStatus = data.map((todo: { id: number; completed: boolean }) => todo.completed);

      setTodos(data);
      setCompleted(completedStatus);

      const isCheckedState = data.reduce((acc: { [key: number]: boolean }, todo: { id: number; completed: boolean }) => {
        acc[todo.id] = todo.completed;
        return acc;
      }, {});
      setIsChecked(isCheckedState);

      console.log("Component mounted!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchDataAndUpdateState(); 
}, [setTodos]);


  //remove
  const handleRemoveTask = async (index: number) => {
    try {
      const taskId = todos[index].id;
      await axios.delete(`https://backend-production-7211.up.railway.app/api/tasks/${taskId}/`);

      console.log("Task deleted successfully");

      onTaskDelete(taskId);
      setCompleted((prevCompleted) => [
        ...prevCompleted.slice(0, index),
        ...prevCompleted.slice(index + 1),
      ]);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //Edit
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState("");

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedTask(todos[index].title);
  };

  const handleSaveEdit = async (index: number) => {
    try {
      const taskId = todos[index].id;
      await axios.put(`https://backend-production-7211.up.railway.app/api/tasks/${taskId}/`, {
        title: editedTask,
      });
      console.log("Edited Task:", editedTask);

      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        const updatedTask = { ...updatedTodos[index], title: editedTask };
        updatedTodos[index] = updatedTask;

        updatedTodos.unshift(updatedTodos.splice(index, 1)[0]);

        return updatedTodos;
      });

      setEditingIndex(null);
      setEditedTask("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTask("");
  };

  const shortDateFormat = todos.map((todo) =>
    daysjs(todo.created_at).format("D/MMM/YYYY")
  );

  const [filterOption, setFilterOption] = useState("all");

  const filteredTodos = todos.filter((task) => {
    if (filterOption === "all") {
      return true; // Show all tasks
    } else if (filterOption === "pending") {
      return !task.completed; // Show pending tasks (completed is false)
    } else if (filterOption === "completed") {
      return task.completed; // Show completed tasks (completed is true)
    }
    return false;
  });
  


  
    
  const incompleteTasksCount: number = todos.filter(todo => !todo.completed).length;
 
  return (
    <>
      <Fill totalTasks={todos.length} />



<div className="flex justify-center items-center gap-6 mb-6">
  <button className={filterOption === "all" ? "active" : ""} onClick={() => setFilterOption("all")}>All</button>
  <button className={filterOption === "pending" ? "active" : ""} onClick={() => setFilterOption("pending")}>Pending</button>
  <button className={filterOption === "completed" ? "active" : ""} onClick={() => setFilterOption("completed")}>Completed</button>

  <span className={`shake ${incompleteTasksCount === 0 || filterOption === "pending" ? "hidden" : "bg-[#63df74]"} absolute top-14 rounded-full w-5 h-5 text-sm`}>
  {incompleteTasksCount > 0 && filterOption !== "pending" && incompleteTasksCount}
</span>

</div>



      <div className="grid grid-cols-1 gap-3 lg:w-8/12 mx-auto"
        style={{ gridAutoFlow: "dense" }}>
            {filteredTodos.map((task, index) => (
          <span
            className={
              task.completed
                ? "bg-green-400 rounded-xl bg-opacity-25 hover:cursor-pointer"
                : "bg-white bg-opacity-10 hover:bg-gradient-to-r hover:from-pink-200 hover:to-rose-100 rounded-xl"}>
            <div
              style={{ height: "min-content" }}
              className="relative text-left col-span-1 bg-opacity-15 rounded text-sm p-6 lg:w-8/12 w-full md:mx-auto"
              key={task.id}
              onClick={() => toggleButtons(task.id)}>

              {editingIndex === index ? (
                <div className="">
                  <textarea
                    className="bg-transparent border border-gray-500 w-full max-h-32 h-32 py-1 px-2 rounded outline-none"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />

                  <div className="flex justify-between items-center">
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  {task.title}

                  {showButtons[task.id] && (
                    <div className="flex flex-col gap-3">
                      <p className="my-2">{shortDateFormat[index]}</p>
                      <div className="flex items-center gap-4 mt-3">

                        <input className="mr-2"
                          type="checkbox"
                          checked={isChecked[task.id]}
                          onChange={() => handleCompleted(task)}/>

                        <button onClick={() => handleRemoveTask(index)}>
                          <FaTrashAlt className="text-rose-500 w-4 h-4" />
                        </button>

                        <button onClick={() => handleEdit(index)}>Edit</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </span>
        ))}
      </div>
    </>
  );
};

export default TodoItems;
