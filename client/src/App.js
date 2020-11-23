import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.state));
  }, []);
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(todos));
    console.log("saving..");
  }, [todos]);

  return (
    <div style={{ margin: `1rem` }}>
      <h1>To Dos</h1>
      <ul>
        {todos &&
          todos.map((x) => (
            <li key={x.id}>
              <input
                type="checkbox"
                style={{ marginRight: `1rem` }}
                checked={x.checked}
                onChange={(e) => {
                  var todos1 = [...todos];
                  var foundIndex = todos1.findIndex((y) => y.id === x.id);
                  todos1[foundIndex].checked = e.target.checked;
                  setTodos([]);
                  setTodos(todos1);
                }}
              />

              {x.todo}
              <span style={{ marginLeft: `1rem` }}>
                <button
                  onClick={() => {
                    setTodos(todos.filter((y) => y.id !== x.id));
                  }}
                >
                  X
                </button>
              </span>
            </li>
          ))}
      </ul>
      <label htmlFor="basic-url">add Task</label>
      <div>
        <input
          type="text"
          id="basic-url"
          onKeyPress={(e) => {
            e.key === "Enter" &&
              setTodos([
                ...todos,
                {
                  todo: e.target.value,
                  checked: false,
                  id: Date.now(),
                },
              ]);

            e.key === "Enter" && (e.target.value = "");
          }}
        />
      </div>
    </div>
  );
};

export default App;
