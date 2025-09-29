import React from "react";


// Save tasks into local storage
export function saveTasks(task) {
    localStorage.setItem("Tasks", JSON.stringify(task));
}

// Getting tasks from local storage
export function getTasks() {
    const data = JSON.parse(localStorage.getItem("Tasks"));
    return data ? data : [];
}

// Adding tasks to local
export function addTasks(task) {
    const tasks = getTasks();
    if(tasks) {
        tasks.push(task);   
        saveTasks(tasks);
    }
    else {
        saveTasks([task]);
    }
}

// Updating existing task
export function updateTask(task) {
    const tasks = getTasks().map((each) => (each.id === task.id) ? task : each);
    saveTasks(tasks);
}

// Deleting Task
export function deleteTask(task) {
    const tasks = getTasks().filter((each) => each.id !== task.id);
    saveTasks(tasks);
}