import React, { useState, useEffect, useMemo } from 'react';
import { getTasks, addTasks, updateTask, deleteTask } from '../utils/localStorageHelpers';
import TaskCard from '../Components/TaskCard';

// Task Properties
// id: Date.now().toString(),          // unique ID
// title: "Sample Task",               // task title
// description: "This is a test task",
// due date : date
// status: "Pending",                  // Pending / Completed
// priority: "Medium",                 // Low / Medium / High
// createdAt: new Date().toISOString()

function Dashboard() {
  // Initital data fetching


  // Loading Tasks data from local storage.
  const [data, setData] = useState(() => getTasks());
  const [submitted, setSubmittedData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // States inside card view
  const [newCardStatus, setNewCardStatus] = useState(false);
  const [viewStaus, setViewStatus] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [editStatus, setEditStatus] = useState(false);

  // Task List filter states & sorting 
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Handler to set viewStatus
  const handleAddTaskBtn = () => {
    setNewCardStatus(true);
  };

  // Handler for editButton
  const handleEditBtn = (id) => {
    setCardData(data.find((each) => each.id === id));
    setViewStatus(false);
    setEditStatus(true);
  };

  // Handler for view task.
  const handleViewBtn = (id) => {
    setCardData(data.find((each) => each.id === id));
    setViewStatus(true);
  };

  const handleDeleteBtn = (id) => {
    setDeleteData(data.find((each) => each.id === id));
    setViewStatus(false);
  };

  // Filter handler
  const filteredData = useMemo(() => {  
    let resultData = data.filter((each) => ((statusFilter === '' || each.status === statusFilter) && (priorityFilter === '' || each.priority === priorityFilter)));

    if(sortBy === 'dueDate') {
      resultData = [...resultData].sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate));
    }
    else if(sortBy === 'createdAt') {
      resultData = [...resultData].sort((t1, t2) => new Date(t2.createdAt) - new Date(t1.createdAt));
    }
    else if(sortBy === 'priority') {
      const priorityValue = {High : 3, Medium : 2, Low : 1};
      resultData = [...resultData].sort((t1, t2) => priorityValue[t2.priority] - priorityValue[t1.priority]);
    }

    return resultData;

  }, [data, statusFilter, priorityFilter, sortBy]);

  const clearFilterBtn = () => {
    setPriorityFilter(''); 
    setStatusFilter('');
    setSortBy('');
    setViewStatus(false);
  }

  // UseEffect for backend storage CRUD Operations
  useEffect(() => {
    if (submitted) {
      if (data.find((entry) => entry.id === submitted.id)) {
        updateTask(submitted);
      } else {
        addTasks(submitted);
      }
      setSubmittedData(null);
      setData(getTasks());
    }
    if(deleteData) {
      deleteTask(deleteData);
      setDeleteData(null);
      setData(getTasks());
    }

  }, [submitted, deleteData]);

  

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>
      <h4>Task List</h4>
      <div className="filters">
        <label>Status : </label>
        <select name="filterByStatus" value={statusFilter} onChange={(event) => {setStatusFilter(event.target.value)}}>
          <option value="">All</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <label>Priority : </label>
        <select name="filterByPriority" value={priorityFilter} onChange={(event) => {setPriorityFilter(event.target.value)}}>
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label>Sort : </label>
        <select name="sortBy" value={sortBy} onChange={(event) => {setSortBy(event.target.value)}}>
          <option value="">All</option>
          <option value="dueDate">Due Date</option>
          <option value="createdAt">Created At</option>
          <option value="priority">Priority</option>
        </select>
        <button onClick={clearFilterBtn}>Clear Filter</button>
      </div>
      <div className="dashboard-body">
        <div className="task-list">
          <ul>
            {filteredData.length === 0 ? (
              <div>No Saved Data....</div>
            ) : (
              filteredData.map((each) => (
                <li key={each.id}>
                  <span>
                    {} - {each.title} - {each.status} - {each.priority} - {each.dueDate}
                    <div className="task-actionBtns">
                      <button onClick={() => handleViewBtn(each.id)}>
                        View
                      </button>
                      <button onClick={() => handleEditBtn(each.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteBtn(each.id)}>Delete</button>
                    </div>
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="button-area">
          <button onClick={handleAddTaskBtn}>Add Task</button>
          {(newCardStatus || viewStaus || editStatus) && (
            <TaskCard
              newCardStatus={newCardStatus}
              viewStatus={viewStaus}
              editStatus={editStatus}
              setViewStatus={setViewStatus}
              setEditStatus={setEditStatus}
              setNewCardStatus={setNewCardStatus}
              setSubmittedData={setSubmittedData}
              cardData={cardData}
              setCardData={setCardData}
              handleEditBtn={handleEditBtn}
              handleDeleteBtn={handleDeleteBtn}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
