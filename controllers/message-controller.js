const { message } = require('../models');
const db = require('../models');
const { NotFoundErrorResponse } = require('../response-schema/error-schema');

const messageController = {
    // getAll: Pas logique de mettre cette methode car il est inutile de getter tts les message
    getById: async (req, res) => {
        const id = parseInt(req.params.id);
       
        const message = await db.message.findByPk({
            where : { id }
        });
        if(!message) {
        return res.status(401).json(new NotFoundErrorResponse('message not found'))

        }
    },
    add: async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.validedData;

        const newCategory = await db.category.create(data);
        res.json(new SuccesObjectResponse(message));
    },
    update: async(req, res) => {
        const id = parseInt(req.params.id)
        const data = req.validedData; 
        const [nbRow, updatedData] = await db.message.update(data, {
            where: { id }, //Ecriture simplifié -> {id: id }
            returning: true //utilisé avec la methode update()
        });
        // Nombre de row modifier
      
        if(nbRow !== 1) {
            return res.status(400).json(new ErrorResponse('error during update'));
        }
        res.json(new SuccesObjectResponse(updatedData[0]));
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.id)
        const nbRow = await db.message.destroy({
            where: { id }
        });
        if(nbRow !== 1) {
            return res.status(404).json(new NotFoundErrorResponse('message not found'));
        };
        res.sendStatus(204);
    }
    
};  
module.exports = messageController;