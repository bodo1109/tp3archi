const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // In production, this should be in environment variables

const mockUser = {
  id: '1',
  email: 'admin@example.com',
  password: 'password123', // In production, this should be hashed
  name: 'Admin User'
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};