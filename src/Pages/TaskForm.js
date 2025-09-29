import React, { useState, useEffect } from "react";

function TaskForm() {
    console.log("Hello");
    const[formData, setFormData] = useState({
        id : '',
        title : '',
        description : '',
        status : '',
        dueDate : '',
        priority : '',
        status : '',
    });

    const handleChange = (event) => {
        // Collecting event data
        const{ key, value } = event.target;

        setFormData((property) => ({
            ...property,
            key : value
        }));
    }

    const handleCancel = () => {
        setFormData({
            id : '',
            title : '',
            description : '',
            status : '',
            dueDate : '',
            priority : '',
            status : '',
        });
    }

    const handleSave = () => {
        console.log(formData);
        alert("saved");
    }

    return(
        <div className="task-card">
            <div className="card-header">
                <h2>Task</h2>
            </div>
            <div className="card-body">
                <input 
                    type="text"
                    name = "title"
                    placeholder="Title"
                    onChange={handleChange}
                    className="input-text"
                />
                <input
                    name="description"
                    type="textarea"
                    placeholder="Description..."
                    onChange={handleChange}
                    className="input-textarea"
                />
                <input
                    name="dueDate"
                    type="date"
                    onChange={handleChange}
                />
                <div>
                    <label>Priority</label>
                    <span>
                        <input type="radio" name="priority" value="Low" onChange={handleChange}/>
                        <input type="radio" name="priority" value="Medium" onChange={handleChange}/>
                        <input type="radio" name= "priority" value="High" onChange={handleChange}/>
                    </span>
                </div>
                <div>
                    <label>Status</label>
                    <select name = "status" v onChange={handleChange}>
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
    )
}

export default TaskForm;