const { DataTypes, Sequelize } = require('sequelize');


/**
 * Representation du model member
 * @param {Sequelize} sequelize //c'est ce qu'on entre  comme donnée
 * @returns    // ce que ça renvoie
 */
module.exports = (sequelize) => {

    const member = sequelize.define('member', {
        // Attributs
        Pseudo: {

            type: DataTypes.STRING(50),
            allowNull: false, 
            unique: {
                 name: 'UK_member_Pseudo'
            }
        },
        email: {

            type: DataTypes.STRING(255),
            allowNull: false, 
            unique: {
                 name: 'UK_member_Email'
            }
        },
        Password: {

            type: DataTypes.CHAR(60),
            allowNull: false, 
            
        },
        IsAdmin: {

            type: DataTypes.BOOLEAN,
            allowNull: false,  //ça n'autorise pas les valeurs null
            defaultValue: false,  // ça n'envoie pas de valeur par default
        }
    }, {
        timestamps: true,
        updateAt: false
    });

    return member; 
};
