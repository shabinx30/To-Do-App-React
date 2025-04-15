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
    const [changes, setChanges] = useState('');


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
            ShowError()

            setValue("");
            return;
        }

        if (test !== "") {
            setList((l) => [...l, { task: test, isStrike: false, isEdit: false }]);
            setValue("");
        }
    }

    // adding the strike
    function strikeList(index) {
        let res = lists.map((list, i) => {
            if (i == index) {
                return { ...list, isStrike: !list.isStrike }
            }
            return list
        })
        setList(res)
    }

    // deletion
    function deleteList(index) {
        const tasks = lists.filter((_, i) => i !== index);
        setList(tasks);
    }

    // editing
    function openEdit(index, task) {
        let res = lists.map((list, i) => {
            // close the curresponding input box
            if (i == index) {
                // add the task if it provided
                if(task) {
                    return { ...list, task: task, isEdit: !list.isEdit }
                }
                return { ...list, isEdit: !list.isEdit }
            }
            // close if any another input box is open
            return { ...list, isEdit: false }
        })
        setList(res)
    }

    function editList(e, index) {
        e.preventDefault();
        let value = changes.trim()
        
        if (lists.filter((list, i) => list.task.toUpperCase() === value.toUpperCase() && i !== index).length > 0) {
            
            //show error
            ShowError()
            return;
        }
        
        setChanges('')
        if (value !== "") {
            openEdit(index, value)
        }
    }

    const ShowError = () => {
        newError.current.style.display = "flex";
        newError.current.style.animation = "errorS 0.5s ease forwards";

        setTimeout(() => {
            newError.current.style.animation = "errorF 0.5s ease forwards";
            newError.current.style.opacity = "0";
        }, 3000);
    }

    return (
        <>
            <Error newError={newError} />
            <div className="app-container" onClick={() => {
                    if(changes) {
                        openEdit(-1)
                        setChanges('')
                    }
                }}
            >
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
                                    <List key={index} index={index} changes={changes} setChanges={setChanges} lists={lists} strikeList={strikeList} editList={editList} deleteList={deleteList} openEdit={openEdit} />
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