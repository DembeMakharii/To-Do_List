// Load todos from localStorage for the current user
function loadTodos() {
  const userId = localStorage.getItem('userId');
  const allTodos = JSON.parse(localStorage.getItem('allTodos')) || {};
  return allTodos[userId] || [];
}

// Save todos to localStorage for the current user
function saveTodos(todos) {
  const userId = localStorage.getItem('userId');
  const allTodos = JSON.parse(localStorage.getItem('allTodos')) || {};
  allTodos[userId] = todos;
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

// Fetch Todos (now loads user-specific todos from localStorage)
function fetchTodos() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('You must be logged in to view todos.');
    window.location.href = 'login.html';
    return;
  }

  const todos = loadTodos();
  renderTodos(todos);
}

// Render Todos
function renderTodos(todos) {
  console.log('Rendering Todos:', todos); // Log to check if data is updated

  const todoTasks = document.getElementById('todoTasks');
  const inProgressTasks = document.getElementById('inProgressTasks');
  const doneTasks = document.getElementById('doneTasks');

  todoTasks.innerHTML = '';
  inProgressTasks.innerHTML = '';
  doneTasks.innerHTML = '';

  todos.forEach(todo => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <p>${todo.task} - ${todo.priority} - ${todo.status}</p>
      <button onclick="editTodo('${todo.id}', '${todo.task}', '${todo.priority}')">📝 Edit</button>
      <button onclick="deleteTodo('${todo.id}')">❌ Delete</button>
      <button onclick="moveTodo('${todo.id}', '${todo.status}')">🔄 Move</button>
    `;

    if (todo.status === 'todo') todoTasks.appendChild(taskElement);
    else if (todo.status === 'in-progress') inProgressTasks.appendChild(taskElement);
    else if (todo.status === 'done') doneTasks.appendChild(taskElement);
  });
}

// Add Todo
window.addTodo = (task, status, priority) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('You must be logged in to add todos.');
    return;
  }

  const id = Date.now().toString(); // Generate unique ID using timestamp
  const newTodo = { id, task, status, priority, userId }; // Include userId in todo object
  const todos = loadTodos();
  todos.push(newTodo);
  saveTodos(todos);
  fetchTodos();
};

// Edit Todo
window.editTodo = (id, currentTask, currentPriority) => {
  const newTask = prompt('Edit Task:', currentTask);
  const newPriority = prompt('Edit Priority (high, medium, low):', currentPriority);

  if (newTask && newPriority) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.task = newTask;
      todo.priority = newPriority;
      saveTodos(todos);
      fetchTodos();
    }
  }
};

// Delete Todo
window.deleteTodo = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    const todos = loadTodos();
    const updatedTodos = todos.filter(t => t.id !== id);
    saveTodos(updatedTodos);
    fetchTodos();
  }
};

// Move Todo
window.moveTodo = (id, currentStatus) => {
  const todos = loadTodos();
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const newStatus = currentStatus === 'todo' ? 'in-progress' :
                   currentStatus === 'in-progress' ? 'done' : 'todo';
  
  todo.status = newStatus;
  saveTodos(todos);
  fetchTodos();
};

// Initialize
window.addEventListener('load', fetchTodos);