import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Utility functions
function getTime() {
  return new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getDay() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function App() {
  const [time, setTime] = useState(getTime());
  const [day, setDay] = useState(getDay());
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage initially
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => setInput(e.target.value);

  const addTodo = useCallback(() => {
    if (input.trim() !== "") {
      setTodos((prev) => [...prev, { title: input.trim(), complete: false }]);
      setInput("");
    }
  }, [input]);

  const toggleTodo = useCallback((index) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }, []);

  const clearCompletedTodos = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.complete));
  }, []);

  const clearAllTodos = useCallback(() => setTodos([]), []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  // Update time and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
      setDay(getDay());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="public/to-do-list.png" alt="App logo" />
        </div>
        <div>
          <div className="time">{time}</div>
          <div className="day">{day}</div>
        </div>
      </div>

      <div className="notebook">
        <div className="buttons">
          <button
            title="Clear Completed To-Dos"
            onClick={clearCompletedTodos}
            aria-label="Clear completed todos"
          >
            <img src="public/delete.svg" alt="Clear completed" height="30" width="30" />
          </button>
          <button
            title="Clear All To-Dos"
            onClick={clearAllTodos}
            aria-label="Clear all todos"
          >
            <img src="public/clearall.svg" alt="Clear all" height="30" width="30" />
          </button>
        </div>

        <div className="innerbox">
          <hr />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {todos.map((todo, index) => (
              <React.Fragment key={index}>
                <li
                  style={{
                    textDecoration: todo.complete ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleTodo(index)}
                >
                  {todo.title}
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>

          <div className="inputwrapper">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter New To-Do"
              aria-label="Enter a new todo"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
