const messageController = require('../controllers/message-controller');
const authentificateJwt = require('../middlewares/authentifacate-jwt');
const bodyValidation = require('../middlewares/body-validation');
const messageValidator = require('../validators/message-validator');


const messageRouter = require('express').Router();

// Routing pour les acces utilisateur
// Recuperation des données avec les methodes GET
// Modification et suppression pour les personnes identifiées

messageRouter.route('/:id([0-9]+)')
    .get(messageController.getById)
    .put(authentificateJwt(),bodyValidation(messageValidator), messageController.update)
    .delete(authentificateJwt(),messageController.delete);


module.exports = messageRouter;