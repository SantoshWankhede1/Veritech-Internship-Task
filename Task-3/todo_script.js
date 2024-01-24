document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value !== '') {
        const task = document.createElement('li');
        task.innerHTML = `
            <span>${taskInput.value}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="togglePriority(this)">Priority</button>
                <button onclick="toggleStatus(this)">Done</button>
            </div>
        `;
        taskList.appendChild(task);

        saveTask(taskInput.value);
        taskInput.value = '';
    }
}

function editTask(button) {
    const taskText = button.parentElement.previousElementSibling;
    const newTaskText = prompt('Edit task:', taskText.textContent);

    if (newTaskText !== null) {
        taskText.textContent = newTaskText;
        updateLocalStorage();
    }
}

function deleteTask(button) {
    const task = button.parentElement.parentElement;
    task.remove();
    updateLocalStorage();
}

function togglePriority(button) {
    const task = button.parentElement.parentElement;
    task.classList.toggle('priority-high');
    task.classList.toggle('priority-medium');
    task.classList.toggle('priority-low');
}

function toggleStatus(button) {
    const task = button.parentElement.parentElement;
    task.classList.toggle('completed');
    updateLocalStorage();
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, priority: 'low', status: 'pending' });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="togglePriority(this)">Priority</button>
                <button onclick="toggleStatus(this)">Done</button>
            </div>
        `;
        taskItem.classList.add(`priority-${task.priority}`, `${task.status}`);
        taskList.appendChild(taskItem);
    });
}

function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;

    for (let i = 0; i < taskList.length; i++) {
        const taskText = taskList[i].getElementsByTagName('span')[0].textContent;
        const priorityClass = taskList[i].classList[1] || 'low';
        const statusClass = taskList[i].classList[2] || 'pending';

        tasks.push({ text: taskText, priority: priorityClass.split('-')[1], status: statusClass });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
