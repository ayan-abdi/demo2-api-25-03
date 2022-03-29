// pour lier le controller avec l'index:
const db = require('../models');
const { NotFoundErrorResponse } = require('../response-schema/error-schema');
const { SuccesObjectResponse, SuccesArrayResponse } = require('../response-schema/succes-schemas');

const categoryController = {

    getAll: async (req, res) => {
    
        const data = await db.category.findAndCountAll({
            order: [['name', ASC]],
            offset: req.pagination.offset,
            limit: req.pagination.limit
        });

        res.json(new SuccesArrayResponse(data.rows, data.count));  //Savoir les Rows??????
    },

    getById: async (req, res) => {
        const id = parseInt(req.params.id);
       
        const category = await db.category.findOne({
            where: { id: id}
        });

        if (!category) {
            return res.status(404).json(new NotFoundErrorResponse('Category not found'));
        }
        res.json(new SuccesObjectResponse(category));

    },
    add: async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.validedData;

        // const newCategory = await db.category.create(data);
        res.json(new SuccesObjectResponse(newCategory));
    },
    update: async(req, res) => {
        const id = parseInt(req.params.id)
        const data = req.validedData; 
        const UpdateCategory = awaitdb.category.update(data, {
            where: { id }, //Ecriture simplifié -> {id: id }
            returning: true //utilisé avec la methode update()
        });
        const updatedData = UpdateCategory[1];
        res.json(new SuccesObjectResponse(updatedData[0]));
    },
    delete:async(req, res) => {
        const id = parseInt(req.params.id)
        const nbRow = await db.category.destroy({
            where: { id }
        });
        if(nbRow !== 1) {
            return res.status(404).json(new NotFoundErrorResponse('Category not found'));
        };
    },
    addCategories: async (req, res) => {

    },
    removeCategories : async (req, res) => {

    },
    getAllMessage:async (req, res) => {
        
    },
    getOneMessage:async (req, res) => {

    },
    addMessage:async (req, res) => {

    },
    updateMessage:async (req, res) => {

    },
    deleteMessage:async (req, res) =>{
        res.sendStatus(404)
    }
    

};

module.exports = categoryController;