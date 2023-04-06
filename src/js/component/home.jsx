import React from "react";

import { useState, useEffect} from "react";

const Home = () => {
	const [todoList, setTodoList] = useState([]);
  const [newTodoLabel, setNewTodoLabel] = useState([]);


  const handleAddTodo = async () => {
	const newTodo = { label: newTodoLabel, done: false };
	const todoArray = todoList ? [...todoList, newTodo] : [newTodo];
	const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/jleserra', {
	  method: 'PUT',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(todoArray)
	});
	if (response.ok) {
	  const data = await response.json();
	  setTodoList(todoArray); // set the state to the updated array with the new todo
	  setNewTodoLabel(''); // clear the input field
	} else {
	  console.error('There was a problem adding the todo');
	}
  };

  const handlePostUser = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/jleserra",
      {
        method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([])
      }
    );
    if (response.ok) {
      console.log("User created successfully");
    } else {
      console.error("There was a problem creating the user");
    }
  };





  const handleDeleteUser = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/jleserra",
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setTodoList([]); // clear the todo list
      console.log("User and todos deleted successfully");
    } else {
      console.error("There was a problem deleting the user");
    }
  };

  return (
	<div>
      <h1>Todo List</h1>
	  <button onClick={handlePostUser}>Create User</button>
      <ul>
        {todoList.map(todo => {
			
          return (
            <li key={todo.id}>
              {todo.label}
            </li>
			
          );
        })}
      </ul>
      <div>
        <input type="text" value={newTodoLabel} onChange={e => setNewTodoLabel(e.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>
		
		<button onClick={handleDeleteUser}>Delete User</button>
      </div>
    </div>
  );
};

export default Home;
