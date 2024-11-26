import { useState } from "react";
import "./App.css";

function App() {
  // states
  const [lists, setList] = useState([
    { task: "i wanna create to do app", isStrike: false },
    { task: "nothing", isStrike: true },
  ]);

  const [input, setValue] = useState("");
  const [check, setCheck] = useState(false);

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
      }, 2500);
  
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
  function editList(index) {}

  return (
    <>
      <div className="error" id="newError">
        <div>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <p>
          This task is already existing!!!
        </p>
      </div>
      <div className="app-container">
      <div className="to-do">
        <h1>To Do List</h1>
        <form action="#" onSubmit={(e)=> addList(e)}>
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
          <ul>
            {lists.map((list, index) => (
              <li key={index} className={list.isStrike ? "done" : "list-item"}>
                <input
                  type="checkbox"
                  value={check}
                  checked={list.isStrike}
                  onChange={(e) => strikeList(e, index)}
                />
                <div className="task-container">
                  <div className="text">
                    {/* <input type="text" value={list.tast} /> */}
                    <p className={list.isStrike ? "strike" : ""}>{list.task}</p>
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
                      onClick={() => editList(index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
