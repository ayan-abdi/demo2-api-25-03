const db = require('../models');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/jwt-utils');
const { ErrorResponse } = require('../response-schema/error-schema');
const { Op } = require('sequelize');


const authController = {
    register: async (req, res) => {
        //  // Recuperation des données
        const { pseudo, email } = req.validedData;

         // Hashage du mot de passe à l'aide de "bcrypt"
        const password = bcrypt.hashSync(req.validedData.password, 10);

         // Création du compte en base de données
        const member = await db.member.create({ pseudo, email, password });
        // Génération d'un « Json Web Token »
        const token = await generateJWT({
            id: member.id,
            pseudo: member.pseudo,
            isAdmin: member.isAdmin
        });

        // Envoi du token
        res.json(member);
    },
    login: async (req, res) => {
         // Recuperation des données
        const { identifier, password } = req.validedData;

        // Récuperation du compte "member" à l'aide du pseudo ou de l'email
        const member = await db.member.findOne({
            where: {  // Condition avec un OU en SQL
                [Op.or]: [
                    {   // Test du pseudo avec une egalité stricte (implicite)
                        pseudo: { [Op.eq]: identifier.toLowerCase() }
                    },
                    {
                        email: { [Op.eq]: identifier.toLowerCase() }
                    }
                ]
            
            } 
        
        });
        // Si le member n'existe pas ('Identifier' invalide)
        if (!member) {
            return res.status(422).json(new ErrorResponse('Bad credential', 422));
        }

        // Si le member existe: Check le password via bcrypt
        const isValid = await bcrypt.compare(password, member.password);

        // Si le mot de passe n'est pas valide
        if (!isValid) {
            return res.status(422).json(new ErrorResponse('Bad credential', 422));
        }

        // Génération d'un « Json Web Token »
        const token = generateJWT({
            id: member.id,
            pseudo: member.pseudo,
            isAdmin: member.isAdmin

        });
         // Envoi du token
        res.json(token);
    }
};

module.exports = authController;