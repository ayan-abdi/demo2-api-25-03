const { Request, Response, NextFunction } = require('express'); 
const { InvalidConnectionError } = require('sequelize/types');
const { BaseSchema } = require('yup');
/**
 * 
 * @param {BaseSchema} yupValidator 
 * @param {number} errorCode 
 * @returns {(req:Request, res: Response, next:NextFunction) => void}
 */


const bodyValidation = (yupValidator, errorCode = 422) =>{


    /**
     * middleware pour valider les données via yup validator
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return (req, res, next) => {
        yupValidator.noUnknown().validate(req.body, { abortEarly: false})
        .then((data) => {
            // Ajout d'une propriété "validedData" avec les données validées par yup
            req.validedData = data;

            // Ajout de la methode "next"
            next();
        })
        .catch(yupError => {
            // Création d'un objet "errors" sur base de données de validation YUP
            const errors = yupError.inner.reduce((acc, error) => {
                const { path, message } = error;
                if(!acc.hasOwnProperty(path)) {
                    acc[path] = [message];
        
                }
                else {
                    acc[path].push(message);
                }
                return acc;
            }, {});
            // Envoi d'une reponse d'erreur formatté
            res.status(errorCode).json(new InvalidConnectionError(
                'Data invalide',
                errors,
                errorCode
            ));
        });
    }
}
module.exports = bodyValidation;