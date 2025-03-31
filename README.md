# To-Do List Application

## Overview
This is a comprehensive To-Do List application with user authentication, task management, and a Kanban-style board for organizing tasks. The application is built with HTML, CSS, and JavaScript, using Firebase for authentication and localStorage for task persistence.

## Features

✨ **Icons Added:** The application now includes icons for enhanced visual representation and improved user experience.
### 1. User Authentication
- **Registration:** Users can create new accounts with email and password.
- **Login:** Existing users can log in with their credentials.
- **Logout:** Secure logout functionality.
- **Session Persistence:** Maintains user session across page refreshes.

### 2. Task Management
- **Add Tasks:** Create new tasks with descriptions, priorities, and statuses.
- **Edit Tasks:** Modify existing task details.
- **Delete Tasks:** Remove tasks from the system.
- **Move Tasks:** Change task status (To-Do → In Progress → Done).
- **Task Persistence:** Tasks are saved to localStorage and persist between sessions.

### 3. Kanban Board
- **Visual Organization:** Tasks are displayed in three columns (To-Do, In Progress, Done).
- **Drag & Drop:** Intuitive interface for moving tasks between columns.
- **Priority Indicators:** Visual cues for task priority levels.

### 4. User Interface
- **Responsive Design:** Works on desktop and mobile devices.
- **Modern Styling:** Clean, attractive interface with animations.
- **Glassmorphism Effects:** Contemporary design elements.
- **Dark/Light Mode:** (Optional - can be implemented).

## Technical Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+).
- **Authentication:** Firebase Authentication.
- **State Management:** localStorage for task persistence.
- **Styling:** Custom CSS with modern design principles.

## Live Deployment
You can access the live version of the application here: [To-Do List Application](https://dembemakharii.github.io/To-Do_List/)

## Installation
1. Clone the repository:
```bash
 git clone https://github.com/yourusername/todo-app.git
 cd todo-app
```

2. Install dependencies:
```bash
 npm install
```

3. Set up Firebase:
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Email/Password authentication.
- Add your Firebase config to `js/auth.js`.

4. Run the application:
- Open `index.html` in your browser or use a local server.

## Usage
### Registration:
- Navigate to the registration page.
- Enter your email and password.
- Click "Register" to create your account.

### Login:
- Enter your registered email and password.
- Click "Login" to access your tasks.

### Managing Tasks:
- **Add Task:** Fill out the form at the top of the page.
- **Edit Task:** Click the "Edit" button on any task.
- **Delete Task:** Click the "Delete" button on any task.
- **Move Task:** Click the "Move" button to advance a task's status.

### Logout:
- Click the "Logout" button in the header to securely sign out.

## File Structure
```
todo-app/
├── index.html          # Main landing page
├── login.html          # User login page
├── register.html       # User registration page
├── todo.html           # Main application interface
├── styles.css          # Global styles
├── js/
│   └── auth.js         # Firebase authentication logic
├── img/                # Image assets
├── .gitignore          # Specifies files to ignore in version control
└── package.json        # Project dependencies
```

## Customization
You can customize the application by:
- **Changing Colors:** Modify the CSS variables in `styles.css`.
- **Adding Features:** Extend the JavaScript functionality.
- **Integrating Backend:** Replace localStorage with a database like Firebase Firestore.
- **Adding Categories:** Implement task categorization or tagging.

## Security Considerations
- Passwords are securely handled by Firebase Authentication.
- User sessions are managed client-side with localStorage.
- For production use, consider implementing additional security measures.

## Future Enhancements
- Task Categories/Tags: Add organizational features.
- Due Dates: Implement deadlines and reminders.
- Collaboration: Allow sharing tasks with other users.
- Data Export: Export tasks to CSV or other formats.
- Dark Mode: Implement theme switching.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License
This project is open-source and available under the MIT License.

