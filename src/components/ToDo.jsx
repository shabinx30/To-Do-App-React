import { useState, useEffect, useRef } from "react";
import List from "./List";
import Error from "./Error";
import "../App.css";

function ToDo() {
    // states
    const [lists, setList] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [input, setValue] = useState("");
    const [check, setCheck] = useState(false);


    const newError = useRef(null)

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

        if (lists.filter((list) => list.task.toUpperCase() === test.toUpperCase()).length > 0) {
            // Show error div

            newError.current.style.display = "flex";
            newError.current.style.animation = "errorS 0.5s ease forwards";

            // Hide error div
            setTimeout(() => {
                newError.current.style.animation = "errorF 0.5s ease forwards";
            }, 3000);

            setTimeout(() => {
                newError.current.style.opacity = "0";
            }, 3000);

            setValue("");
            return;
        }

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
            l.map((list, i) => i === index ? { ...list, isStrike: isChecked } : list)
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
        document.getElementById("task-change" + index).value = document.getElementById("task-text" + index).textContent;
    }

    function editList(e, index) {
        e.preventDefault();
        let value = document.getElementById("task-change" + index).value.trim();

        if (lists.filter((list, i) => list.task.toUpperCase() === value.toUpperCase() && i !== index).length > 0) {

            newError.current.style.display = "flex";
            newError.current.style.animation = "errorS 0.5s ease forwards";

            setTimeout(() => {
                newError.current.style.animation = "errorF 0.5s ease forwards";
            }, 3000);

            setTimeout(() => {
                newError.current.style.opacity = "0";
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
            <Error newError={newError} />
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
                        {lists.length > 0 ? (
                            <ul>
                                {lists.map((_, index) => (
                                    <List key={index} index={index} check={check} lists={lists} strikeList={strikeList} editList={editList} deleteList={deleteList} openEdit={openEdit} />
                                ))}
                            </ul>
                        ) : (
                            <p className="no-task">No task added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDo;
