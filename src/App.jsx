import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(getTime());
  const [day, setDay] = useState(getDay());

  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  function getTime() {
    return new Date().toLocaleString('en-us', { hour: '2-digit', minute: '2-digit' });
  }

  function getDay() {
    return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  const handleTodo = (e) => {
    setInput(e.target.value);
  };

  const handleButton = () => {
    if (input.trim() !== "") {
      setTodo([...todo, { title: input, complete: false }]);
      setInput(""); // Clear the input field after adding the todo
    }
  };

  const handleToggle = (index) => {
    const newTodo = [...todo];
    newTodo[index].complete = !newTodo[index].complete;
    setTodo(newTodo); // Update the state with the modified array
  };

  const deletetodo = () => {
    const newTodo = todo.filter((todoItem) => {
      return !todoItem.complete;
    });
    setTodo(newTodo);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButton();
    }
  };
  
  const clearAllTodos = () => {
    setTodo([]); // Clears all to-dos
  };

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
          <img src="src/assets/to-do-list.png" alt="#" />
        </div>
        <div>
          <div className="time">{time}</div>
          <div className="day">{day}</div>
        </div>
      </div>
      <div className="notebook">
        
      <div className="buttons">
          <button title='Clear the Completed To-Do' onClick={deletetodo}>
            <img src="./src/assets/delete.svg" alt="" height={"30px"} width={"30px"} />
          </button>
          <button title='Clear the ALL To-Do' onClick={clearAllTodos}>
            <img src="./src/assets/clearall.svg" alt="" height={"30px"} width={"30px"} />
          </button>
          </div>
        <div className='innerbox'>
        <hr />
          <ul style={{ listStyleType: 'none' }}>
            {todo.map((todo, index) => (
              <><li
                key={index}
                style={{ textDecoration: todo.complete ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                <span onClick={() => handleToggle(index)}>{todo.title}</span>
              </li><hr /></>
            ))}
          </ul>
          <div className="inputwrapper">
          <input type="text" value={input} onChange={handleTodo} onKeyDown={handleKeyPress} placeholder='Enter New To-Do'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
