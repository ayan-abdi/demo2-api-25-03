const express = require('express');
const pagination = require('./middlewares/pagination-middleware');
require('express-async-errors'); // avec cette ecriture il s'injecte automatiquement dans express

// Load env file
require('dotenv-flow').config();

// Variables env
const { PORT, NODE_ENV} = process.env; 
console.log(process.env);

//  Create WEB API
const app = express();

// Add Middllewares
app.use(express.json());

// Initialize Database
const db = require('./models');
// Connection with DATABASE
db.sequelize.authenticate()
.then(() => console.log('Connection DB GOED ♥'))
.catch((error) => console.log('Connection DB NIET GOED ', error)); 

// Synchronize between database and vscode
if(NODE_ENV !== "production") {
    
    // cette ligne doit etre en commentaire car elle reactialise les modifications qui ne sont pas forcement definitive d'ou en commentaire avant de l'activer
    db.sequelize.sync({ force: true});  /// la connection entre code et database et les droits accordés a sequelize
    // db.sequelize.sync({ force: true}); si on garde cette ligne sequelize drop tt a chaque fois que
}
// Add routing
const router = require('./routes');

app.use('/api/', router)


// Start WEB API
app.listen( PORT, () => {
    console.log(`Kombinen in mijn Api web in ${PORT} [${NODE_ENV}]`);
});
