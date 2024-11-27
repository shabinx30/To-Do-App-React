import { useState,useEffect } from "react";
import "./App.css";

function App() {
  // states
  const [lists, setList] = useState(() => {
    // Load saved tasks from localStorage or start with an empty array
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setValue] = useState("");
  const [check, setCheck] = useState(false);

  // Save tasks to localStorage whenever the `lists` state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(lists));
  }, [lists]);

  // change input value
  function changeValue(event) {
    setValue(event.target.value);
  }

  // add to list
  function addList(e) {
    e.preventDefault();
    let test = input.trim();

    // Check for duplicates
    if (
      lists.filter((list) => list.task.toUpperCase() === test.toUpperCase())
        .length > 0
    ) {
      // Show error div
      const errorDiv = document.getElementById("newError");
      errorDiv.style.display = "flex";
      errorDiv.style.animation = "errorS 0.5s ease forwards";

      // Hide error div after 3 seconds
      setTimeout(() => {
        errorDiv.style.animation = "errorF 0.5s ease forwards";
      }, 3000);

      setTimeout(() => {
        errorDiv.style.opacity = "0";
      }, 3000);

      setValue(""); // Clear the input
      return;
    }

    // Add task if not a duplicate
    if (test !== "") {
      setList((l) => [...l, { task: test, isStrike: false }]);
      setValue("");
    }
  }

  // adding the strike
  function strikeList(event, index) {
    let isChecked = event.target.checked;

    setCheck(isChecked);

    setList((l) =>
      l.map((list, i) =>
        i === index ? { ...list, isStrike: isChecked } : list
      )
    );
  }

  // deletion
  function deleteList(index) {
    const tasks = lists.filter((_, i) => i !== index);
    setList(tasks);
  }

  // editing



  function openEdit(index) {
    document.getElementById("task-change" + index).style.display = "block";
    document.getElementById("task-text" + index).style.display = "none";
    document.getElementById("task-change" + index).value =
      document.getElementById("task-text" + index).textContent;
  }

  function editList(e, index) {
    e.preventDefault()
    let value = document.getElementById("task-change" + index).value.trim();

    if (
      lists.filter((list,i) => list.task.toUpperCase() === value.toUpperCase() && i !== index)
        .length > 0
    ) {
      const errorDiv = document.getElementById("newError");
      errorDiv.style.display = "flex";
      errorDiv.style.animation = "errorS 0.5s ease forwards";

      // Hide error div after 3 seconds
      setTimeout(() => {
        errorDiv.style.animation = "errorF 0.5s ease forwards";
      }, 3000);

      setTimeout(() => {
        errorDiv.style.opacity = "0";
      }, 3000);

      return;
    }

    if (value !== "") {
      e.preventDefault();
      document.getElementById("task-text" + index).style.display = "block";
      const updatedLists = lists.map((item, i) => {
        if (i === index) {
          return { ...item, task: value };
        }
        return item;
      });

      setList(updatedLists);
      document.getElementById("task-change" + index).style.display = "none";
    }
  }


  return (
    <>
      <div className="error" id="newError">
        <div>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <p>This task is already existing!!!</p>
      </div>
      <div className="app-container">
        <div className="to-do">
          <h1>To Do List</h1>
          <form action="#" onSubmit={(e) => addList(e)}>
            <input
              type="text"
              id="input"
              value={input}
              autoComplete="off"
              onChange={changeValue}
              placeholder="New Task..."
            />
            <button type="submit" className="add">
              Add
            </button>
          </form>
          <div className="to-do-list">
            {lists.length > 0 ? <ul>
              {lists.map((list, index) => (
                <li
                  key={index}
                  className={list.isStrike ? "done" : "list-item"}
                >
                  <input
                    type="checkbox"
                    value={check}
                    checked={list.isStrike}
                    onChange={(e) => strikeList(e, index)}
                  />
                  <div className="task-container">
                    <div className="text">
                      <form onSubmit={(e) => editList(e, index)}>
                        <input
                          type="text"
                          id={"task-change" + index}
                          style={{ display: "none" }}
                        />
                      </form>
                      <p
                        id={"task-text" + index}
                        className={list.isStrike ? "strike" : ""}
                      >
                        {list.task}
                      </p>
                    </div>
                    <div className="button-group">
                      <button
                        className="delete-button"
                        onClick={() => deleteList(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => openEdit(index)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul> : <p className="no-task">No task added yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
