import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItems from "./TodoItems";
import { ITodo } from "../../types/types";
import { fetchData } from "../../services/apiService";
import Form from "../../pages/Form";
import { Link, Route, Routes, useNavigate, useLocation, } from "react-router-dom";

const TodoListForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isFormPage = location.pathname === "/form";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-production-7211.up.railway.app/api/tasks/", {
        title: title,
      });
      const newTask = response.data;

      setTodos((prevTodos) => [newTask, ...prevTodos]);
      setTitle("");

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTaskDelete = (taskId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
  };

  useEffect(() => {
    fetchData().then((data) => setTodos(data));
  }, []);

  return (
    <div className="break-words">
      <Routes>
        <Route
          path="/form"
          element={
            <Form
              handleSubmit={handleSubmit}
              title={title}
              setTitle={setTitle}
            />
          }
        />

        <Route
          path="/"
          element={
            <TodoItems
              todos={todos}
              setTodos={setTodos}
              onTaskDelete={handleTaskDelete}
            />
          }
        />
      </Routes>

      <div className="flex items-center gap-4 fixed bottom-4 right-5">
        {!isHomePage && (
          <Link className="font-semibold" to="/">
            Back
          </Link>
        )}

        {!isFormPage && (
          <Link to="/form">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className=" bg-sky-200 shadow-md rounded-full p-1 hover:scale-125 block w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TodoListForm;
