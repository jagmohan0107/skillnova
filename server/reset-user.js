const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = 'users.json';
const targetEmail = 'suravirani0405@gmail.com';

async function resetPassword() {
  try {
    const users = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const userIndex = users.findIndex(u => u.email === targetEmail);
    
    if (userIndex === -1) {
       console.log("Subject ID not found in AI registry.");
       return;
    }

    const hashedPassword = await bcrypt.hash('asdf', 10);
    users[userIndex].password = hashedPassword;
    
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    console.log(`UPLINK_SUCCESS: Password for ${targetEmail} reset to 'asdf' with hash ${hashedPassword}.`);
  } catch (error) {
    console.error("AI Scale Corruption:", error);
  }
}

resetPassword();
