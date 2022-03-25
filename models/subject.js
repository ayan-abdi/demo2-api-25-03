const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    // Initialize Suject model
    const subject = sequelize.define('subject', {
        //  type: DataTypes.STRING,  allowNull: false on etait mis pour le cas ou le subject est mis en []
       
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return subject;
}