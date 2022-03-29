const db = require('../models');
const { NotFoundErrorResponse } = require('../response-schema/error-schema');


const subjectController = {
    getAllMessage: async (req, res) => {
        const subjectId = parseInt(req.params.id);
        const { rows, count } = await db.sequelize.finAndCountAll({
            attributes: {
                // exclude: 
            }
        })
    },
    addMessage: async (req, res) => {
        const subjectId = parseInt(req.params.id);
        const data = req.validedData;

        const subject = await db.subject.findByPk(subjectId);
        if(!subject) {
            return res.status(404).json(new NotFoundErrorResponse('Suject not found'));
        }

        const transaction = await db.sequelize.transaction();
        try {
            const message = await subject.createMessage(data,  { transaction});
        }
        finally {

        }

    },

    delete: (req, res) => {
        const id = parseInt(req.params.id)
        const transaction = await db.sequelize.transaction() // permet de ............
        const nbRow = await db.subject.destroy({
            where: { id }
        });
        if(nbRow !== 1) {
            return res.status(404).json(new NotFoundErrorResponse('Subject not found'));
        };
    }
    

};
