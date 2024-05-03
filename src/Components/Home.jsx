import React, { useEffect, useState } from 'react';
import './Home.css';
import APICalls from '../Service/APICalls';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [userID, setUserId] = useState();
  const [nextId, setNextId] = useState(201);
  const [taskTitle, setTitle] = useState();
  const [filter, setFilter] = useState('all');

  const allTasks = () => {
    APICalls.getTasks().then((response) => {
      console.log("response from API:- ", response.data, taskTitle);
      setTasks(response.data);
    })
  }
  useEffect(() => {
    allTasks();
  }, []);

  const handleFormSubmit = () => {
    const newTask = { userId: userID, id: nextId, title: taskTitle, completed: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNextId(nextId + 1);
  }

  const handleDelete = (id) => {
    const updatedList = tasks.filter(task => task.id !== id);
    setTasks(updatedList);
  }

  const handleStatus = (task) => {
    console.log("inside handle status function with id=", task.id);
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t)));
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'true') {
      return task.completed;
    } else if (filter === 'false') {
      return !task.completed;
    }
  });


  return (
    <div className='home'>
      <div className='header'>
        <h1>Welcome to Task Tracker</h1>
      </div>

      <div className='filter'>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>

      <div className='input-field'>
        <input placeholder="User ID" className="input" name="text" type="text" onChange={(e) => { setUserId(e.target.value) }} />
        <input placeholder="Title" className="input" name="text" type="text" onChange={(e) => { setTitle(e.target.value) }} />
        <button type='button' className='btn btn-primary' onClick={handleFormSubmit}>Add Task</button>
      </div>

      <div className='container1'>
        <div className='content1'>
          <table className="table1">
            <thead>
              <tr style={{ fontSize: '20px' }}>
                <th>User ID</th>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
                <th>Change Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredTasks.map((t, k) => (
                  <tr key={k} className={(t.completed === true)? "completed" : ""}>
                    <td>{t.userId}</td>
                    <td>{t.id}</td>
                    <td>{t.title}</td>
                    <td>{t.completed ? 'true' : 'false'}</td>
                    <td><button className='btn btn-success' onClick={() => handleStatus(t)}
                    >Completed</button></td>
                    <td><button className='btn btn-danger' onClick={() => handleDelete(t.id)}>Delete</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Home;