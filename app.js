const express = require('express');
require('dotenv').config();
const app = express();
const dbRoute = require('./routes/dbroute');
const path = require('node:path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', dbRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
