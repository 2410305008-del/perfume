const { readData, writeData } = require('../utils/storage');

// ── Simple deterministic ID generator ────────────────────
function generateId() {
  return `USR-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

// ── Simple password "hashing" (XOR + base64 — demo only) ─
// For production, use bcrypt. This avoids native module issues.
function hashPassword(password) {
  const key = 'yscent';
  let result = '';
  for (let i = 0; i < password.length; i++) {
    result += String.fromCharCode(password.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return Buffer.from(result).toString('base64');
}

function verifyPassword(plain, hashed) {
  return hashPassword(plain) === hashed;
}

// ── POST /api/auth/register ───────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const users = await readData('users.json', []);
    const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists. Please sign in.'
      });
    }

    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      role: 'member'
    };

    users.push(newUser);
    await writeData('users.json', users);

    console.log(`[Auth] New member registered: ${newUser.email}`);

    // Return user without password hash
    const { passwordHash, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: `Welcome to the Private Atelier, ${newUser.name}!`,
      user: safeUser,
      token: Buffer.from(JSON.stringify({ id: safeUser.id, email: safeUser.email })).toString('base64')
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Error creating account' });
  }
};

// ── POST /api/auth/login ──────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const users = await readData('users.json', []);
    const user = users.find(u => u.email === email.trim().toLowerCase());

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email address'
      });
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.'
      });
    }

    console.log(`[Auth] Member signed in: ${user.email}`);

    const { passwordHash, ...safeUser } = user;

    res.json({
      success: true,
      message: `Bienvenue, ${user.name}!`,
      user: safeUser,
      token: Buffer.from(JSON.stringify({ id: safeUser.id, email: safeUser.email })).toString('base64')
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error signing in' });
  }
};

// ── GET /api/auth/me (verify token) ──────────────────────
const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));

    const users = await readData('users.json', []);
    const user = users.find(u => u.id === decoded.id && u.email === decoded.email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Session expired. Please sign in again.' });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid session token' });
  }
};

module.exports = { register, login, getMe };
