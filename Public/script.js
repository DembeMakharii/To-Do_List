// public/js/todo.js
document.addEventListener("DOMContentLoaded", async () => {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();

  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value;
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "1", title, description, date }),
    });
    if (response.ok) {
      alert("Task added");
    } else {
      alert("Error adding task");
    }
  });
});

// public/js/todo.js
document.addEventListener("DOMContentLoaded", async () => {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();

  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value;
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "1", title, description, date }),
    });
    if (response.ok) {
      alert("Task added");
    } else {
      alert("Error adding task");
    }
  });
});

// public/js/auth.js

// Handle Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    window.location.href = "/todo.html";
  } else {
    alert("Login failed");
  }
});

// Handle Sign Up Form Submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    alert("Account created successfully! Please login.");
    window.location.href = "/index.html"; // Redirect to login page
  } else {
    alert("Error creating account");
  }
});

// public/js/auth.js

// Handle Sign Up Form Submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
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

  // Send data to the server
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }),
    });

    if (response.ok) {
      alert("Account created successfully! Please login.");
      window.location.href = "/index.html"; // Redirect to login page
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || "Failed to create account"}`);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
});

// public/js/auth.js
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
    alert(data.message);
    window.location.href = "/todo.html"; // Redirect to the To-Do page
  } else {
    alert(data.message);
  }
} catch (error) {
  alert("An error occurred. Please try again.");
}
});

// public/js/auth.js

// Handle Sign Up Form Submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
e.preventDefault();

// Get form values
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

// Send data to the server
try {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, email, password }),
  });

  if (response.ok) {
    alert("Account created successfully! Redirecting to login...");
    window.location.href = "/index.html"; // Redirect to login page
  } else {
    const errorData = await response.json();
    alert(`Error: ${errorData.message || "Failed to create account"}`);
  }
} catch (error) {
  alert("An error occurred. Please try again.");
}
});