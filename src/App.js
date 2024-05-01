import './App.css';
import React, { useState } from 'react';

function CustomButton(props) {
  const {color, onClick, children} = props

  if (color) {
    return(
      <button
        style={{background: color, color: "white"}}
        onClick={onClick}>
          {children}
      </button>
    );
  }
  return <button onClick={onClick}>{props.children}</button>;
}

//Implement the Task function component.
function Task(props) {
  return (
    <div className='card-box'>
      <div className="user-card">
      <div> <span className='title'>{props.task.title}</span> <br></br> <span>{props.task.content} </span></div>
      <CustomButton color='red' onClick={() => props.handleDelete(props.task.id)}>Delete</CustomButton>
      <CustomButton color='blue' onClick={() => props.handleDone(props.task)}>DONE</CustomButton>
    </div>
    </div>
  );
}



const App = () => {
  const [tasks, setTasks] = useState ([
    {id : 1, title : "Exercise", content : "Do a home workout routine."},
    {id : 2, title : "Social Time", content : "Plan a virtual hangout with friends."},
    {id : 3, title : "Planning", content : "Review calendar for the upcoming week."}
    ]
  );

  const [completedTasks, setCompletedTask] = useState([]);
  
  // State to hold the task input
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  
  // Add List
  const addTaskHandler = () => {
    const newTask = {
      id: tasks.length + 1,
      content: content,
      title: title,
    };

    // setTasks will modify the list of tasks
    setTasks([...tasks, newTask]);
  };

  // Delete List
  const deleteTaskHandler = (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  };

  // Work Done
  const handleDone = (task) => {
    setCompletedTask([...completedTasks, task]);
    deleteTaskHandler(task.id);
  };

  // Cancel Task
  const cancelTaskHandler = (task) => {
    // Remove the task from completedTasks
    const newCompletedTasks = completedTasks.filter((completedTask) => completedTask.id !== task.id);
    setCompletedTask(newCompletedTasks);

    // Add the task back to tasks
    setTasks([...tasks, task]);
  };

  // Delete completed Task
  const deleteHandler = (id) => {
    // Delete completed tasks from completedTasks
    const updatedCompletedTasks = completedTasks.filter((task) => task.id !== id);
    setCompletedTask(updatedCompletedTasks);
  }
  

    return (
      <div className="app-container">
        <div className='header'>My Todo List📝<span style={{"float":"right"}}>React</span></div>
        
        <form className='form-input'>
          <div className='input'>
            <label htmlFor='title'>Title:
              <input value={title} 
                placeholder='title'
                className='value'
                //update the input value from the input event with the name
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label htmlFor='content'>Content:
              <input value={content} 
                placeholder='content'
                className='value'
                //update the input value from the input event with the age
                onChange={(e) => setContent(e.target.value)} 
              />
            </label>

            <button className='add-button' onClick={addTaskHandler}> Add </button>

          </div>
        </form>

        <div className='tasks'>
          <h2>Working...🤞</h2>
          {tasks.map((task) => {
            return <Task task={task} key={task.id} handleDelete={deleteTaskHandler} handleDone={handleDone} handleCancel={cancelTaskHandler}/>
          })}
        </div>

        <div>
          <h2>Done...!🎉</h2>
          <div className='completed-task'>
            {completedTasks.map((task) => (
              <div className='card-box' key={task.id}>
                <div className="user-card">
                  <div>
                    <span className='title'>{task.title}</span> <br />
                    <span>{task.content} </span>
                  </div>
                  <CustomButton color='blue' onClick={() => cancelTaskHandler(task)}>Cancel</CustomButton>
                  <CustomButton color='red' onClick={() => deleteHandler(task.id)}>Delete</CustomButton>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
  );
};

export default App;
