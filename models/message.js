const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    // initialize model Message
    const message = sequelize.define('message', {
        // clef primaire
        // id: {
        //     type:DataTypes.BIGINT,
        //     autoIncrement: true,
        //     primarykey: true
        // },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false, 
        }

    }, {
        // Dans le cas ou le nom sur mon code est  different de celui sur ma db on met l'option suivante
        tableName: 'SubjectMessages'
    });
    return message;
}
