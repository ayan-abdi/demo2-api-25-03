const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
              name: 'UK_categories_Name'
            } 
           
        }

    }, {
        timestamps: false // permet d'enlever les colonnes(createdate et updatedate)
    });

    return category;
};