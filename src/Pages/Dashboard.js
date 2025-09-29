import React, { useState, useEffect } from 'react';
import { getTasks, addTasks, updateTask } from '../utils/localStorageHelpers';
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

  useEffect(() => {
    if (submitted) {
      if (data.find((entry) => entry.id === submitted.id)) {
        updateTask(submitted);
      } else {
        addTasks(submitted);
      }
      setData(getTasks());
      setSubmittedData(null);
    }
  }, [submitted]);

  // States inside card view
  const [viewStaus, setViewStatus] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [editStatus, setEditStatus] = useState(false);

  // Handler to set viewStatus
  const handleAddTaskBtn = () => {
    setViewStatus(true);
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

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>
      <div className="dashboard-body">
        <div className="task-list">
          <h3>Task List</h3>
          <ul>
            {data.length === 0 ? (
              <div>No Saved Data....</div>
            ) : (
              data.map((each) => (
                <li key={each.id}>
                  <span>
                    {each.id} - {each.title} - {each.status}
                    <div className="task-actionBtns">
                      <button onClick={() => handleViewBtn(each.id)}>
                        View
                      </button>
                      <button onClick={() => handleEditBtn(each.id)}>
                        Edit
                      </button>
                      <button>Delete</button>
                    </div>
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="button-area">
          <button onClick={handleAddTaskBtn}>Add Task</button>
          {(viewStaus || editStatus) && (
            <TaskCard
              viewStatus={viewStaus}
              editStatus={editStatus}
              setViewStatus={setViewStatus}
              setEditStatus={setEditStatus}
              setSubmittedData={setSubmittedData}
              cardData={cardData}
              setCardData={setCardData}
              handleEditBtn={handleEditBtn}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
