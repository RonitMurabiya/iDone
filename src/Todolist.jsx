import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  Eye,
  EyeOff,
  Trash2,
  Pencil,
  Save,
  X,
} from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const filteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.done);

  return (
    <div className="min-h-screen  flex items-center justify-center p-8">
      {/* <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8"> */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-3xl shadow-2xl p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">📋 iDone </h2>
           <DarkModeToggle />
        </div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            {showCompleted ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Hide completed
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show completed
              </>
            )}
          </button>

        <div className="flex space-x-2 mb-6 mt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a task..."
            className="flex-grow px-4 py-2 border rounded-xl shadow-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl"
              >
                {editId === todo.id ? (
                  <div className="flex-grow flex items-center space-x-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow px-3 py-1 border rounded-lg focus:outline-none"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex items-center space-x-2 flex-grow cursor-pointer ${
                      todo.done ? "line-through text-gray-500" : ""
                    }`}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.done ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Circle className="text-gray-400" />
                    )}
                    <span>{todo.text}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 ml-2">
                  {editId === todo.id ? (
                    <>
                      <button onClick={() => saveEdit(todo.id)}>
                        <Save className="w-5 h-5 text-green-600 hover:text-green-800" />
                      </button>
                      <button onClick={() => setEditId(null)}>
                        <X className="w-5 h-5 text-gray-500 hover:text-red-600" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600 transition" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-6">No tasks to show.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
