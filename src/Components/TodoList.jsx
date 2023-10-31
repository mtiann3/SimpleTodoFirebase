import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    const todoCollection = await getDocs(collection(db, "todos"));
    setTodos(todoCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    await addDoc(collection(db, "todos"), {
      text: input,
      isCompleted: false,
    });
    setInput("");
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  const toggleComplete = async (id, isCompleted) => {
    await updateDoc(doc(db, "todos", id), {
      isCompleted: !isCompleted,
    });
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg justify-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-400 w-full p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Add a new todo..."
      />
      <button
        onClick={addTodo}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Add Todo
      </button>
      <ul className="list-disc list-inside mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center my-2 bg-white p-3 rounded-lg shadow-md"
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo.id, todo.isCompleted)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span
              className={
                todo.isCompleted ? "line-through ml-3 text-gray-500" : "ml-3"
              }
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="ml-auto text-white bg-red-500 border border-red-700 hover:bg-red-700 px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
