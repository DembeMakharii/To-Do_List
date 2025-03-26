// server.js
import express from 'express';
import bcrypt from 'bcryptjs';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public', "land.html")));


// PostgreSQL connection configuration
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Todo',
  password: '123456',
  port: 5432,
});

// Test database connection
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'land.html'));
});

// User model
class User {
  static async create({ name, surname, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const query = `
      INSERT INTO users (name, surname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, surname, email, created_at
    `;
    const values = [name, surname, email, hashedPassword];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }
}

// Task model
class Task {
  static async create({ userId, title, description, date }) {
    const query = `
      INSERT INTO tasks (user_id, title, description, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, title, description, date];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByIdAndUpdate(id, { status }) {
    const query = `
      UPDATE tasks
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const { rows } = await db.query(query, [status, id]);
    return rows[0];
  }

  static async findByIdAndDelete(id) {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

// Auth Routes
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name, surname, email, password });
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Task Routes
const taskRouter = express.Router();

taskRouter.post('/', async (req, res) => {
  const { userId, title, description, date } = req.body;

  try {
    const task = await Task.create({ userId, title, description, date });
    res.status(201).json({ 
      message: 'Task added successfully',
      task
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error adding task', error: error.message });
  }
});

taskRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { status });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ 
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
});

taskRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ 
      message: 'Task deleted successfully',
      task
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error deleting task', error: error.message });
  }
});

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});