import users from '../../data/users.json';

export const authenticateUser = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return { username: user.username, role: user.role };
  } else {
    throw new Error('Invalid credentials');
  }
};
