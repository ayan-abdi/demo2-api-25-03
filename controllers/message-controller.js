const { Op } = require('sequelize');
const db = require('../models');
const { NotFoundErrorResponse } = require('../response-schema/error-schema');
const { SuccesObjectResponse } = require('../response-schema/succes-schemas');


const messageController = {
    // getAll: Pas logique de mettre cette methode car il est inutile de getter tts les message
    getById: async (req, res) => {
        const id = parseInt(req.params.id);
       
        const message = await db.message.findByPk({
            include: {
                model: db.member,
                attributes: ['id', 'pseudo']
                
            }, 
            attributes : {
                exclude: ['memberId'] 
            }
        
           
        });
        if(!message) {
        return res.status(401).json(new NotFoundErrorResponse('message not found'))

        }
    },
    // add: async (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const data = req.validedData;

    //     const newCategory = await db.category.create(data);
    //     res.json(new SuccesObjectResponse(message));
    // },
    update: async(req, res) => {
        const id = parseInt(req.params.id)
        const data = req.validedData; 
        const memberId = req.user.id;

        const [nbRow, updatedData] = await db.message.update(data, {
             //Ecriture simplifié -> {id: id }
            where: {
                [Op.and]: [
                    { id },
                    { memberId }
                ]
            },
            returning: true //utilisé avec la methode update()
            
        });
            // Nombre de row modifier
      
        if(nbRow !== 1) {
            return res.status(400).json(new ErrorResponse('error during update'));
        }
        res.json(new SuccesObjectResponse(updatedData));
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.id)
        //  message supprimer que pas son autheur et ou admin
        const {id: memberId, isAdmin } = req.user;
        const target = await db.message.findByPk(id);
        if(!target) {
            return res.sendStatus(404).json(new NotFoundErrorResponse('message not found'))
        }
        if(!(target.memberId === memberId || isAdmin)) {
            return res.status(403);
        }
        // Methode alternative et courte
        await target.destroy();
        // if alternatif
        // if( target.memberId !== memberId && idAdmin) {
        //     return res.sendStatus(403);
        // }
       
        // const nbRow = await db.message.destroy({
        //     where: { id },
        //     
        // });
        
        // await transaction.commit();
        res.sendStatus(204);
    }
    
};  
module.exports = messageController;