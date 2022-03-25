const Sequelize = require('sequelize');
// Sequelize Initialization
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        pool: {
            min: 0,  //le temps de connexion minimum simultané à declarer
            maw: 5,  // le temps de connexion maximum simultané à declarer
            idle: 10_000,   //le  temps maximum d'inactivité avant qu'il libère la connexion
            acquire: 30_000 //le temps maximun avant qu'il declancle une erreur
        }
        
    }

);

// Create object DB
const db = {}; //On ajoutera le contenu de notre table 

// Add instance of sequelize
db.sequelize = sequelize;

// Add models
db.category = require('./category')(sequelize);
db.subject = require('./subject')(sequelize);
db.message = require('./message')(sequelize);
db.categorySubject = require('./categorySubject')(sequelize);

// Add Association ici on determine le type de liaison etre les tables
db.subject.hasMany(db.message, { onDelete: 'NO ACTION', onUpdate: 'CASCADE'});  // subject a 0-n message
db.message.belongsTo(db.category);  //message appartient qu'a seulement 1e seule categorie

// [Many to Many]
db.subject.belongsToMany(db.category, { through: db.categorySubject });
db.category.belongsToMany(db.subject, { through: db.categorySubject });

// Export object DB
module.exports = db;