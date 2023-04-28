import {v4} from 'uuid'
import {useEffect, useState} from 'react'

import Todo from "./components/Todo"

import './App.css'

const getItems = () => {
  let data = localStorage.getItem("ListItems")
  if(data !== null){
    return JSON.parse(data)
  }
  else{
    return []
  }
}

const App = () => {
const [editStatus, setEditStatus] = useState(false)
const [activeTodoId, setActiveTodoId] = useState("")
const [listItems, setListItems] = useState(getItems())
const [title, setTitle] = useState("")
const [task, setTask] = useState("")



const addTodo = () => {
  if(listItems.find((item,index) => item.name.toLowerCase() === title.toLowerCase()) === undefined && title!=="" && task!==""){
    const newTodo = {
      id:v4(),
      name:title,
      tasks:[{name:task, check:false}]
    }
    setListItems([...listItems, newTodo])
    setTitle("")
    setTask("")
  }
  else if(title!=="" && task!==""){
    let todo = listItems.find((item,index) => item.name.toLowerCase() === title.toLowerCase())
    let newTask = {
      name:task,
      check:false
    }
    todo.tasks.push(newTask)
    setTitle("")
    setTask("")
  }
  else{
    alert("Enter Title and Task")
  }
}

const addTask = () => {
  let todo = listItems.find((item, index) => item.id === activeTodoId)
  let newTask = {
    name:task,
    check:false
  }
  todo.tasks.push(newTask)
  setListItems([...listItems])
  setEditStatus(false)
  setTask("")
}

const changeEditStatus = (id) => {
  setActiveTodoId(id)
  setEditStatus(true)
  setTask("")
}

const deleteTodo = id => {
  let newTodoList = listItems.filter(item => item.id!==id)
  setListItems([...newTodoList])
}

const changeCheckbox = (todoId, taskId) => {
  let todo = listItems.find(item => item.id===todoId)
  let task = todo.tasks.find((item, index) => index===taskId)
  task.check = !task.check 
  setListItems([...listItems])
}

const deleteTask = (todoId, taskId) => {
  let todo = listItems.find(item => item.id === todoId)
  todo.tasks = todo.tasks.filter((item, index) => index!==taskId)
  setListItems([...listItems])
}

let activeTodoName = editStatus ? (listItems.find((item, index) => item.id === activeTodoId).name): ""

useEffect(() => {localStorage.setItem("ListItems", JSON.stringify(listItems))},[listItems])
return(
  <div className="App">
    <h1 className="heading">Todos App</h1>
    <div className="input-container">
      {!editStatus ? <div className="title-input-container">
      <p className="title">Title:</p>
      <input type="text" onChange={(e) => setTitle(e.target.value)} onBlur={(e) => {if(e.target.value === ""){alert("Enter Title")}}} value={title} className="input"/>
      </div> : "" }
      <div className="task-input-container"><p className="task">Task:</p>
      <input type="text" onChange={(e) => setTask(e.target.value)}  onBlur={(e) => {if(e.target.value === ""){alert("Enter Task")}}} value={task} className="input"/>
      </div>
    </div>
    {!editStatus? <button type="button" onClick={() => addTodo()}>Add Todo</button> : <button type="button" onClick={() => addTask()}>Edit {activeTodoName}</button>}
    {listItems.length !== 0 ? <ul className="todo-list-container">
      {listItems.map((item, index) => 
      <Todo todoDetails={item} addTask={addTask} changeEditStatus={changeEditStatus} deleteTodo={deleteTodo} changeCheckbox={changeCheckbox} deleteTask={deleteTask} key={item.id}/>
      )}
    </ul> : ""}
    
  </div>
)
}

export default App