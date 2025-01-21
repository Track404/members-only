const { Router } = require('express');
const dbController = require('../controllers/dbController');
const dbRouter = Router();

dbRouter.get('/', dbController.getIndex);
module.exports = dbRouter;
