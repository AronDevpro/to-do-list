const userId = localStorage.getItem("id").replace(/"/g, "");

// Function to fetch tasks from the API
const fetchTasks = async () => {
    try {
        const url = `http://localhost:3000/api/v1/tasks/${userId}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        console.log(tasks);
        displayTasks(tasks.data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Function to display tasks in the container
const displayTasks = (tasks) => {
    const taskContainer = document.querySelectorAll('.container')[1];
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.dataset.taskId = task._id; // Store task ID for reference

        // Format the date to get the month and date
        const taskDate = new Date(task.date);
        const formattedDate = `${taskDate.toLocaleString('default', { month: 'short' })} ${taskDate.getDate()}`;

        taskElement.innerHTML = `
            <div class="inner-wrapper">
            <div class="tasks">
            <i class="fa-regular fa-square-check" onclick="completeTask('${task._id}')"></i>
                <span class="priority-option ${task.priority}"></span>
                <div class="titledate">
                    <p>${task.title}</p>
                    <p>${formattedDate}</p>
                </div>
                <i class="fa-solid fa-pen-to-square"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask('${task._id}')"></i>
            </div>
            </div>
        `;

        // Event listener for updating a task
        const updateButton = taskElement.querySelector('.fa-pen-to-square');
        updateButton.addEventListener('click', () => openUpdateModal(task));

        taskContainer.appendChild(taskElement);
    });
};

// Function to delete task
const deleteTask = async (id) => {
    try {
        const url = `http://localhost:3000/api/v1/tasks/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        fetchTasks();
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
};

// Function to complete task
const completeTask = async (id) => {
    try {
        const url = `http://localhost:3000/api/v1/tasks/${id}`;
        console.log(url)
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: "completed" })
        });

        fetchTasks();
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Event listener for task submission
    document.getElementById("task").addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;
        const priority = document.querySelector('input[name="priority"]:checked').value;

        try {
            const response = await fetch('http://localhost:3000/api/v1/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date, priority, userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Fetch and display tasks on page load
    fetchTasks();
});

// Function to open modal for updating task
const openUpdateModal = (task) => {
    const modal = document.getElementById('updateModal');
    const closeBtn = document.querySelector('.modal .close');
    const updateForm = document.getElementById('updateForm');

    document.getElementById('updateTitle').value = task.title;
    document.getElementById('updateDate').value = task.date;
    const priorityOptions = document.querySelectorAll('input[name="updatePriority"]');
    priorityOptions.forEach(option => {
        if (option.value === task.priority) {
            option.checked = true;
        }
    });

    // Display the modal
    modal.style.display = 'block';

    // Close the modal when close button is clicked
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close the modal when user clicks outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Handle form submission to update task
    updateForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const updatedTitle = document.getElementById('updateTitle').value;
        const updatedDate = document.getElementById('updateDate').value;
        const updatedPriority = document.querySelector('input[name="updatePriority"]:checked').value;
        console.log(updatedDate,updatedPriority,updatedTitle)
        try {
            const url = `http://localhost:3000/api/v1/tasks/${task._id}`;
            console.log(url)
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: updatedTitle,
                    date: updatedDate,
                    priority: updatedPriority,
                }),
            });

            // Close modal and fetch updated tasks
            modal.style.display = 'none';
            fetchTasks();

        } catch (error) {
            console.error('Error updating task:', error);
        }
    });
};
