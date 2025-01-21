const { Pool } = require('pg');

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: process.env.LOCAL_DATABASE_URL,
});
