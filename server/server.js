const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = 'skillnova_neural_secret_2026';
const DB_PATH = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());

// Support Root Verification
app.get('/', (req, res) => {
  res.json({ 
    status: "ONLINE",
    message: "SkillNova Backend Uplink Active.",
    endpoints: ["POST /api/register", "POST /api/login"],
    timestamp: new Date().toISOString()
  });
});

// Initialize dummy database if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

// --- HELPER FUNCTIONS ---
const getUsers = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    if (!data || data.trim() === "") return [];
    return JSON.parse(data);
  } catch (err) {
    console.error("[DATABASE_ERROR] Failed to parse users.json:", err);
    return []; // Return empty array on failure to prevent crash
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("[DATABASE_ERROR] Failed to save users.json:", err);
  }
};

// --- API ENDPOINTS ---

/**
 * Register Node
 */
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, college, degree, year, domain } = req.body;
    console.log(`[AUTH] Registration attempt for: ${email}`);
    const users = getUsers();

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "COMMUNICATION_LINK_EXISTING: Email already has an active uplink." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      college,
      degree,
      year,
      domain,
      stats: { matches: 0, battles: 0, readiness: 15 },
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '24h' });
    const { password: _, ...userWithoutPassword } = newUser;
    
    console.log(`[AUTH] Registration successful for: ${email}`);
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error("[AUTH_CRITICAL] Registration Failure:", err);
    res.status(500).json({ message: "INTERNAL_CORE_ERROR: Registration node failed." });
  }
});

/**
 * Login Node
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[AUTH] Login attempt for: ${email}`);
    
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      console.log(`[AUTH] Login failed: User not found (${email})`);
      return res.status(400).json({ message: "AUTHENTICATION_FAILURE: Identity not found in network." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`[AUTH] Login failed: Password mismatch for ${email}`);
      return res.status(401).json({ message: "AUTHENTICATION_FAILURE: Secure pattern mismatch." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
    const { password: _, ...userWithoutPassword } = user;
    
    console.log(`[AUTH] Login successful for: ${email}`);
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error("[AUTH_CRITICAL] Login Failure:", err);
    res.status(500).json({ message: "INTERNAL_CORE_ERROR: Authentication node failed." });
  }
});

// Change Password Endpoint
app.post('/api/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "PROFILE_NOT_FOUND: Subject ID rejected." });
  }

  // Verify old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "INVALID_CREDENTIALS: Legacy access pattern rejected." });
  }

  // Hash and update
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const userIndex = users.findIndex(u => u.email === email);
  users[userIndex].password = hashedPassword;

  saveUsers(users);

  res.json({ message: "UPLINK_PATTERN_UPDATED: New access code established." });
});

// Mock Verification Store
const verificationCodes = new Map();

// Send Verification Code Endpoint
app.post('/api/send-verification', (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes.set(email, code);
  
  console.log(`[AI_UPLINK] Verification code for ${email}: ${code}`);
  
  res.json({ message: "VERIFICATION_SENT: Check your uplink (Console Log) for the 6-digit access code." });
});

// Verify Old Password (Eager Check)
app.post('/api/verify-password', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({ message: "PROFILE_NOT_FOUND: Subject ID rejected." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "INVALID_CREDENTIALS: Legacy access pattern rejected." });
  }

  res.json({ message: "IDENTITY_CONFIRMED: Access pattern validated." });
});

// Update Profile (Name) Endpoint
app.post('/api/update-profile', (req, res) => {
  const { email, newName } = req.body;
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: "PROFILE_NOT_FOUND: Subject ID rejected." });
  }

  users[userIndex].name = newName;
  saveUsers(users);

  res.json({ 
    message: "IDENTIFIER_UPDATED: AI name synchronized.",
    user: users[userIndex]
  });
});

// Reset Password (Forgot Password) Endpoint
app.post('/api/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const storedCode = verificationCodes.get(email);
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);

  // 1. Verify Code (123456 demo masterkey)
  if (code !== "123456" && storedCode !== code) {
    return res.status(401).json({ message: "VERIFICATION_FAILURE: Invalid or expired access code." });
  }

  // 2. Clear code and update password
  verificationCodes.delete(email);
  if (userIndex !== -1) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedPassword;
    saveUsers(users);
    res.json({ message: "PATTERN_RESTORED: Your access code has been securely rewritten." });
  } else {
    res.status(404).json({ message: "PROFILE_NOT_FOUND: Subject ID rejected." });
  }
});

// Verify Code Endpoint
app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;
  const storedCode = verificationCodes.get(email);
  
  // Accept the MASTERKEY (123456) for demo, OR the randomly generated code
  if (code === "123456" || (storedCode && storedCode === code)) {
    verificationCodes.delete(email); // One-time use
    res.json({ message: "UPLINK_VERIFIED: Subject authorized for pattern rewrite." });
  } else {
    res.status(401).json({ message: "VERIFICATION_FAILURE: Invalid or expired access code." });
  }
});

app.listen(PORT, () => {
    console.log(`🚀 SkillNova Backend Uplink Active on http://localhost:${PORT}`);
});
