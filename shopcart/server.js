const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Optional favicon handler to avoid 404 in browser console
app.get('/favicon.ico', (req, res) => {
  // No icon file yet; send empty 204 response
  res.status(204).end();
});

// In-memory user store (for demo only)
// In real apps, replace with a database.
const users = [];

// Helper to find user by email
const findUserByEmail = (email) => users.find((u) => u.email === email.toLowerCase());

// Health check
app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'DigitalMart backend is running' });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    if (findUserByEmail(email)) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'user',
    };

    users.push(user);

    return res.status(201).json({
      message: 'Signup successful.',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Signup error', err);
    return res.status(500).json({ message: 'Internal server error during signup.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // For demo, we just return a simple success message and user info.
    // In a real app, you would issue a JWT or session here.
    return res.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
});

app.listen(PORT, () => {
  console.log(`DigitalMart backend listening on http://localhost:${PORT}`);
});
