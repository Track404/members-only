const { Router } = require('express');
const dbController = require('../controllers/dbController');
const dbRouter = Router();

dbRouter.get('/', dbController.getSignUp);
dbRouter.post('/', dbController.validateUser, dbController.postSignUp);

dbRouter.get('/member', dbController.getMemberPage);
dbRouter.post(
  '/member',
  dbController.validateMember,
  dbController.postMemberPage
);
module.exports = dbRouter;
