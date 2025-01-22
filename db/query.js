const pool = require('./pool');

async function insertUser(firstName, lastName, email, password) {
  await pool.query(
    'INSERT INTO users (firstName, lastName, email, password ,member) VALUES ($1, $2, $3, $4 ,FALSE)',
    [firstName, lastName, email, password]
  );
}

async function findEmail(email) {
  const { rows } = await pool.query(
    'SELECT email FROM users WHERE email = $1',
    [email]
  );
  return rows.length === 0 ? false : rows[0].email;
}

async function updateMember(email) {
  await pool.query('UPDATE users SET member=TRUE WHERE email = $1', [email]);
}

async function findUserInfoByEmail(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    username,
  ]);
  return rows[0];
}

async function findUserInfoById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}
module.exports = {
  insertUser,
  findEmail,
  updateMember,
  findUserInfoByEmail,
  findUserInfoById,
};
