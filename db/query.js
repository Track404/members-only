const pool = require('./pool');

async function insertUser(firstName, lastName, email, password, admin = false) {
  await pool.query(
    'INSERT INTO users (firstName, lastName, email, password ,member,admin) VALUES ($1, $2, $3, $4 ,FALSE,$5)',
    [firstName, lastName, email, password, admin]
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

async function sendMessage(title, message, date, user_id) {
  await pool.query(
    'INSERT INTO messages (title, message, date, user_id) VALUES ($1, $2, $3, $4 )',
    [title, message, date, user_id]
  );
}

async function getAllMessage() {
  try {
    const { rows } = await pool.query(
      'SELECT  d.id ,d.title, d.date, d.message, m.email AS username FROM users m JOIN messages d ON m.id = d.user_id'
    );
    return rows;
  } catch (err) {
    console.error('Error fetching message', err);
    throw err;
  }
}

async function deleteMessageDb(id) {
  await pool.query('DELETE FROM messages WHERE id= $1', [id]);
}
module.exports = {
  insertUser,
  findEmail,
  updateMember,
  findUserInfoByEmail,
  findUserInfoById,
  sendMessage,
  getAllMessage,
  deleteMessageDb,
};
