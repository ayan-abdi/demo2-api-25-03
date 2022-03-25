// pour lier le controller avec l'index:
const db = require('../models');

const categoryController = {

    getAll: async (req, res) => {
        const categories = await db.category.findAll()
        res.json(categories);
    },

    getById: async (req, res) => {
        const id = parseInt(req.params.id);

        const category = await db.category.findOne({
            where: { id: id}
        });

        if (!category) {
            return res.sendStatus(404);
        }

    },
    add: (req, res) => {
        const id = parseInt(req.params.id)
    },
    update: (req, res) => {
        const id = parseInt(req.params.id)
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id)
    },
    

};

module.exports = categoryController;