const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/jwt-utils');

const authController = {
    register: async (req, res) => {
        const { pseudo, email } = req.validedData;
        const password = bcrypt.hashSync(req.validedData.password, 15);

        const member = await db.member.create({ pseudo, email, password });
        res.json(member);
    },
    login: async (req, res) => {
        const { identifier, password } = req.validedData;

        const member = await db.member.findOne({
            where: {
                [Op.or]: [
                    {
                        pseudo: { [op.like]: identifier }
                    },
                    {
                        email: { [op.like]: identifier }
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

        // FIXME Replace by JWT !!!!!!!!!!!
        const token = generateJWT({
            id: member.id,
            pseudo: member.pseudo,

        })
        res.json(token);
    }
};

module.exports = authController;