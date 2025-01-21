const db = require('../db/query');

async function getIndex(req, res) {
  res.render('signUp');
}

module.exports = {
  getIndex,
};
