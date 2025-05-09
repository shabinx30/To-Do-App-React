import React from 'react'
import { motion } from 'framer-motion'

const List = ({ lists, changes, setChanges, index, strikeList, editList, deleteList, openEdit }) => {
    return (
        <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: .05 }}
            onClick={(e) => {
                e.stopPropagation()
                if (changes) {
                    openEdit(-1)
                    setChanges('')
                } else {
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
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setChanges(e.target.value)}
                            className='edit-input'
                            style={{ display: lists[index].isEdit ? 'block' : 'none' }}
                        />
                    </form>
                    <p
                        style={{ display: lists[index].isEdit ? 'none' : 'block' }}
                        className={lists[index].isStrike ? "strike" : "none-strike"}
                    >
                        {lists[index].task}
                    </p>
                </div>
                <div className="button-group">
                    <button
                        className={lists[index].isEdit ? "cancel-button" : "delete-button"}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (lists[index].isEdit) {
                                openEdit(-1)
                                return setChanges('')
                            }
                            deleteList(index)
                        }}
                    >
                        {lists[index].isEdit ? 'Cancel' : 'Delete'}
                    </button>
                    <button
                        className="edit-button"
                        onClick={(e) => {
                            e.stopPropagation()
                            if (lists[index].isEdit) {
                                editList(e, index)
                            } else {
                                openEdit(index)
                            }
                            setChanges(lists[index].task)
                        }}
                    >
                        {lists[index].isEdit ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </motion.li>
    )
}

export default List