const { Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */

module.exports = (sequelize) => {

    const categorySubject = sequelize.define('categorySubject',{}, {

        timestamps: false,
        tableName: 'categorySujects'
    });
     return categorySubject;
}