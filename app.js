const express = require('express');
require('dotenv').config();
const app = express();
const dbRoute = require('./routes/dbroute');
const path = require('node:path');
const pool = require('./db/pool');
const session = require('express-session');
const passport = require('./config/passport');
const pgSession = require('connect-pg-simple')(session);
const sessionStore = new pgSession({
  pool: pool,
  tableName: 'session',
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: sessionStore,
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.session());
app.use('/', dbRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
