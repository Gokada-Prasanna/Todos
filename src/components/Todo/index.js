import {MdDeleteOutline} from 'react-icons/md'

import './index.css'

const Todo = props => {
    const {todoDetails, changeEditStatus, deleteTodo, changeCheckbox, deleteTask} = props
    const {id, name, tasks} = todoDetails 

    const completionStatus = tasks.every(item => item.check === true)? "Completed" : "Not-Completed"
    
    
return(
    <li key={id} className="todo-card">
        <span className={completionStatus}></span>
        <h1 className="card-heading">{name}</h1>
        <div className="controls-buttons-container">
        <button type="button" className="edit-button todo-button" onClick={() => changeEditStatus(id)}>Edit Todo</button>
        <button type="button" className="delete-button todo-button" onClick={() => deleteTodo(id)}>Delete Todo</button>
        </div>
        <ul className="tasks-container">
            {tasks.map((item, index) => <li key={index} className="task-card">
                <div className="task-checkbox">
                <input type="checkbox" id={`${item.name} ${index}`} checked={item.check} onChange={() => changeCheckbox(id, index)}/>
                <label htmlFor={`${item.name} ${index}`} className={item.check ? "strikethrough" : ""}>{item.name}</label>
                </div>
                <MdDeleteOutline onClick={() => deleteTask(id, index)}/>
            </li>)}
        </ul>
    </li>
)
}

export default Todo 