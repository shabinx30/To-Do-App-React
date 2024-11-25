import { useState } from "react";
import "./App.css";

function App() {
  // states
  const [lists, setList] = useState([
    { task: "wanna create to do app", isStrike: false },
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
    if (input.trim() !== "") {
      if (!e) {
        setList((l) => [...l, { task: input, isStrike: false }]);
        setValue("");
      } else if (e.key === "Enter") {
        setList((l) => [...l, { task: input, isStrike: false }]);
        setValue("");
      }
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
  function editList() {}

  return (
    <div className="app-container">
      <div className="to-do">
        <h2>To Do</h2>
        <input
          type="text"
          id="input"
          value={input}
          onKeyDown={addList}
          onChange={changeValue}
        />
        <button onClick={() => addList()}>Add</button>
        <div className="to-do-list">
          <ul>
            {lists.map((list, index) => (
              <li key={index} className="list-item">
                <input
                  type="checkbox"
                  value={check}
                  checked={list.isStrike}
                  onChange={(e) => strikeList(e, index)}
                />
                <div className="task-container">
                  <span className="text">
                    <p className={list.isStrike ? "strike" : ""}>{list.task}</p>
                  </span>
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
  );
}

export default App;
