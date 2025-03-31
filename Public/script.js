// public/js/script.js
document.addEventListener("DOMContentLoaded", async () => {
  // Load tasks for the current user
  const userId = "1"; // In a real app, get this from session
  await loadTasks(userId);

  // Handle form submission
  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;
    
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title, description, date, priority }),
      });
      
      if (response.ok) {
        const data = await response.json();
        addTaskToDOM(data.task);
        taskForm.reset();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  });

  // Filter tasks
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterTasks(btn.dataset.filter);
    });
  });
});

// Load tasks from server
async function loadTasks(userId) {
  try {
    const response = await fetch(`/api/tasks?userId=${userId}`);
    if (response.ok) {
      const data = await response.json();
      data.tasks.forEach(task => addTaskToDOM(task));
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Add task to DOM
function addTaskToDOM(task) {
  const tasksContainer = document.getElementById("tasksContainer");
  
  const taskElement = document.createElement("div");
  taskElement.className = `task ${task.priority}-priority ${task.status === 'completed' ? 'completed' : ''}`;
  taskElement.dataset.id = task.id;
  taskElement.dataset.priority = task.priority;
  
  taskElement.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description || 'No description'}</p>
    <div class="task-meta">
      <span class="priority ${task.priority}">${task.priority}</span>
      <span class="date">${new Date(task.date).toLocaleDateString()}</span>
    </div>
    <div class="task-actions">
      <button class="complete-btn">${task.status === 'completed' ? 'Completed' : 'Complete'}</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;
  
  tasksContainer.appendChild(taskElement);
  
  // Add event listeners for buttons
  const completeBtn = taskElement.querySelector(".complete-btn");
  if (completeBtn.textContent === 'Complete') {
    completeBtn.addEventListener("click", async () => {
      await updateTaskStatus(task.id, 'completed');
      taskElement.classList.add('completed');
      completeBtn.textContent = 'Completed';
    });
  }
  
  taskElement.querySelector(".delete-btn").addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
      taskElement.remove();
    }
  });
}

// Update task status
async function updateTaskStatus(taskId, status) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    alert("Error updating task. Please try again.");
  }
}

// Delete task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE"
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Error deleting task. Please try again.");
  }
}

// Filter tasks by priority
function filterTasks(filter) {
  const tasks = document.querySelectorAll(".task");
  
  tasks.forEach(task => {
    if (filter === "all" || task.dataset.priority === filter) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Store user ID in session storage
      sessionStorage.setItem('userId', data.user.id);
      window.location.href = "/todo.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
});

// Handle signup form submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate password match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }),
    });

    if (response.ok) {
      alert("Account created successfully! Redirecting to login...");
      window.location.href = "/index.html";
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || "Failed to create account"}`);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
});