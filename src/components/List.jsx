import React from 'react'

const List = ({ lists, check, index, strikeList, editList, deleteList, openEdit }) => {
    return (
        <li
            className={
                lists[index].isStrike
                    ? index === 0
                        ? "donef"
                        : index === lists.length - 1
                            ? "donel"
                            : "done"
                    : index === 0
                        ? "listf"
                        : index === lists.length - 1
                            ? "listl"
                            : "list-item"
            }
        >
            <input
                type="checkbox"
                value={check}
                checked={lists[index].isStrike}
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
                        className={lists[index].isStrike ? "strike" : ""}
                    >
                        {lists[index].task}
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
    )
}

export default List