import React from 'react'

const List = ({ lists, changes, setChanges, index, strikeList, editList, deleteList, openEdit }) => {
    return (
        <li 
            onClick={(e) => {
                e.stopPropagation()
                if(changes) {
                    openEdit(-1)
                    setChanges('')
                }else{
                    strikeList(index)
                }
            }}
            className={lists[index].isStrike ? 'done' : "list-item"}
        >
            <input
                type="checkbox"
                checked={lists[index].isStrike}
                onChange={() => strikeList(index)}
            />
            <div className="task-container">
                <div className="text">
                    <form onSubmit={(e) => editList(e, index)}>
                        <input
                            type="text"
                            value={changes}
                            id={"task-change" + index}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setChanges(e.target.value)}
                            style={{ display: lists[index].isEdit ? 'block' : 'none' }}
                        />
                    </form>
                    <p
                        style={{display: lists[index].isEdit ? 'none' : 'block'}}
                        className={lists[index].isStrike ? "strike" : ""}
                    >
                        {lists[index].task}
                    </p>
                </div>
                <div className="button-group">
                    <button
                        className="delete-button"
                        onClick={(e) => {
                            e.stopPropagation()
                            deleteList(index)
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="edit-button"
                        onClick={(e) => {
                            e.stopPropagation()
                            openEdit(index)
                            setChanges(lists[index].task)
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </li>
    )
}

export default List