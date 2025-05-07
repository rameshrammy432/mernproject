const User = require('./models/user');
const bcrypt = require('bcryptjs');

async function migrate() {
  const users = await User.find({ 
    password: { $not: /^\$2a\$/ } 
  });

  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    console.log(`Migrated ${user.email}`);
  }
}

migrate().then(() => process.exit());