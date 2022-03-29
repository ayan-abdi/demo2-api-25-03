const { message } = require('../models');
const db = require('../models');
const { NotFoundErrorResponse } = require('../response-schema/error-schema');

const messageController = {
    getById: async (req, res) => {
        const id = parseInt(req.params.id);
       
        const message = await db.message.findByPk({
            where : { id }
        });
        if(!message) {
        return res.status(401).json(new NotFoundErrorResponse('message not found'))

        }
    }   
};