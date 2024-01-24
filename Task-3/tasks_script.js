document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    
    if (taskTitle && taskDescription) {
        const taskList = document.getElementById('taskList');
        const task = document.createElement('li');
        task.innerHTML = `
            <span class="task-title">${taskTitle}</span>
            <span class="task-description" style="display: none;">${taskDescription}</span>
            <div class="task-actions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="togglePriority(this)">Priority</button>
                <button onclick="toggleStatus(this)">Done</button>
                <button onclick="openModal(this)">Details</button>
            </div>
        `;
        taskList.appendChild(task);

        task.classList.add('priority-low'); // Default priority
        saveTask({ title: taskTitle, description: taskDescription, priority: 'low', status: 'pending' });

        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
    }
}

function editTask(button) {
    const task = button.parentElement.parentElement;
    const currentTitle = task.getElementsByClassName('task-title')[0].textContent;
    const currentDescription = task.getElementsByClassName('task-description')[0].textContent;

    const newTitle = prompt('Edit Task Title:', currentTitle);
    const newDescription = prompt('Edit Task Description:', currentDescription);

    if (newTitle !== null && newDescription !== null) {
        task.getElementsByClassName('task-title')[0].textContent = newTitle;
        task.getElementsByClassName('task-description')[0].textContent = newDescription;

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
    const currentPriority = task.classList[1];

    switch (currentPriority) {
        case 'priority-low':
            task.classList.remove('priority-low');
            task.classList.add('priority-medium');
            break;
        case 'priority-medium':
            task.classList.remove('priority-medium');
            task.classList.add('priority-high');
            break;
        case 'priority-high':
            task.classList.remove('priority-high');
            task.classList.add('priority-low');
            break;
        default:
            // If there is no priority set, assume it's low
            task.classList.add('priority-low');
            break;
    }

    updateLocalStorage();
}


    updateLocalStorage();
}

function toggleStatus(button) {
    const task = button.parentElement.parentElement;
    task.classList.toggle('completed');
    updateLocalStorage();
}

function openModal(button) {
    const taskTitle = button.parentElement.previousElementSibling.textContent;
    const taskDescription = button.parentElement.previousElementSibling.previousElementSibling.textContent;

    document.getElementById('modalTitle').textContent = taskTitle;
    document.getElementById('modalDescription').textContent = taskDescription;
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span class="task-title">${task.title}</span>
            <span class="task-description" style="display: none;">${task.description}</span>
            <div class="task-actions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="togglePriority(this)">Priority</button>
                <button onclick="toggleStatus(this)">Done</button>
                <button onclick="openModal(this)">Details</button>
            </div>
        `;
        taskItem.classList.add(task.priority, task.status);
        taskList.appendChild(taskItem);
    });
}

function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;

    for (let i = 0; i < taskList.length; i++) {
        const taskTitle = taskList[i].getElementsByClassName('task-title')[0].textContent;
        const taskDescription = taskList[i].getElementsByClassName('task-description')[0].textContent;
        const priorityClass = taskList[i].classList[1] || 'low';
        const statusClass = taskList[i].classList[2] || 'pending';

        tasks.push({ title: taskTitle, description: taskDescription, priority: priorityClass, status: statusClass });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
