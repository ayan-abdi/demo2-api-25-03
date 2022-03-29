const messageRouter = require('express').Router();

messageRouter.route('/:id([0-9]+)')
        .get(categoryController.getAll)
        .put(categoryController.update)
        .delete(categoryController.delete);


module.exports = messageRouter;