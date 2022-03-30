const messageController = require('../controllers/message-controller');
const messageRouter = require('express').Router();
const bodyValidation = require('../middlewares/body-validation');
const messageValidator = require('../validators/message-validator');
messageRouter.route('/:id([0-9]+)')
    .get(messageController.getById)
    .put(bodyValidation(messageValidator), messageController.update)
    .delete(messageController.delete);


module.exports = messageRouter;