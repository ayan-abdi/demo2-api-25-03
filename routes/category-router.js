const categoryController = require('../controllers/category-controller');
const authentificateJwt = require('../middlewares/authentifacate-jwt');
const bodyValidation = require('../middlewares/body-validation');
const categoryValidator = require('../validators/category-validator');


const categoryRouter = require('express').Router();
// Routing pour les catégories
// - Récuperation des données avec les méthodes GET
// - Modification autorisé uniquement pour les admin

categoryRouter.route('/')
    .get(categoryController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(categoryValidator),categoryController.add);

    categoryRouter.route('/:id([0-9]+)')
        .get(categoryController.getAll)
        .put(authentificateJwt({ adminRight: true }), bodyValidation(categoryValidator),categoryController.update)
        .delete(authentificateJwt({ adminRight: true }), categoryController.delete);

        

module.exports = categoryRouter;