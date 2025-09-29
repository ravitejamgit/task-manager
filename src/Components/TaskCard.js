import React, { useState } from 'react';

function TaskCard({
  viewStatus,
  editStatus,
  setViewStatus,
  setEditStatus,
  setSubmittedData,
  cardData,
  setCardData,
  handleEditBtn,
}) {
  const emptyForm = {
    id: '',
    title: '',
    description: '',
    status: '',
    dueDate: '',
    priority: '',
    createdAt: '',
  };

  const [formData, setFormData] = useState(cardData ? cardData : emptyForm);

  const handleChange = (event) => {
    // Collecting event data
    const key = event.target.name;
    const value = event.target.value;
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleCancel = () => {
    if (cardData) {
      setCardData(null);
    }
    setFormData(emptyForm);
  };

  const handleSave = () => {
    if (formData.title === '') return;
    if (formData.description === '') return;
    if (formData.status === '') return;
    if (formData.dueDate === '') return;
    if (formData.priority === '') return;
    if (formData.id === '') {
      formData.id = Date.now();
    }
    formData.createdAt = new Date().toISOString();
    setSubmittedData(formData);
    setFormData(emptyForm);
    handleCloseBtn();
  };

  const handleCloseBtn = () => {
    handleCancel();
    setEditStatus(false);
    setViewStatus(false);
    return;
  };

  if (viewStatus) {
    return (
      <div className="task-card">
        <div className="card-closeBtn">
          <button onClick={handleCloseBtn}>X</button>
        </div>
        <div className="card-header">
          <h2>Task</h2>
        </div>
        <div className="card-body">
          <span>Due Date -- {formData.dueDate}</span>
          <br />
          <span>Title -- {formData.title}</span> <br />
          <span>Description -- {formData.description}</span> <br />
          <span>Priority -- {formData.priority}</span> <br />
          <span>Status -- {formData.status}</span> <br />
        </div>
        <div className="card-footer">
          <button onClick={() => handleEditBtn(formData.id)}>Edit</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="task-card">
        <div className="card-closeBtn">
          <button onClick={handleCloseBtn}>X</button>
        </div>
        <div className="card-header">
          <h2>Task</h2>
        </div>
        <div className="card-body">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(event) => handleChange(event)}
            className="input-text"
            value={formData.title}
          />
          <input
            name="description"
            type="textarea"
            placeholder="Description..."
            onChange={(event) => handleChange(event)}
            className="input-textarea"
            value={formData.description}
          />

          <input
            type="date"
            name="dueDate"
            onChange={(event) => handleChange(event)}
            value={formData.dueDate}
          />

          <div>
            <label>Priority</label>
            <span>
              <input
                type="radio"
                name="priority"
                value="Low"
                checked={formData.priority === 'Low'}
                onChange={handleChange}
              />
              <label>Low</label>
              <input
                type="radio"
                name="priority"
                value="Medium"
                checked={formData.priority === 'Medium'}
                onChange={handleChange}
              />
              <label>Medium</label>
              <input
                type="radio"
                name="priority"
                value="High"
                checked={formData.priority === 'High'}
                onChange={handleChange}
              />
              <label>High</label>
            </span>
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
            >
              <option value=""></option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="card-footer">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  }
}

export default TaskCard;
