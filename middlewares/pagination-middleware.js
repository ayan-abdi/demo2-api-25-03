const { Request, Response, NextFunction } = require('express'); 

const defaultOptions = {
    defaultlimit: 20,
    maxLimit: 50
};
/**
 * Middleware pour obtenir les valeurs de pagination
 * @param {(defaultLimit: number?, maxLimit: number?)} options
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */

const pagination = (options) => {
// Fusion des valeurs options et des valeurs par defaut
    const { defaultLimit, maxLimit } = {...defaultOptions,...options };

    /**
     * middleware de pagination
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return (req, res, next) => {
    // req.query.offset =>
    // on veut stocker dans des variables le req.query comme ceci et le parser en meme temps
    const offsetUser = parseInt(req.query.offset);
    // offset vaut la position et limit le nombre de fois ou la position est decalée
    console.log(req.query);
    const limitUser = parseInt(req.query.limit);
     const offset = !isNaN(offsetUser) && req.query.offset > 0 ? offsetUser: 0;
     const limit = !isNaN(limitUser) && req.query.limit > 0 ? Math.min(limitUser, maxLimit) : defaultLimit; 
     req.pagination = { offset, limit };
     next();
    };
};
module.exports = pagination;

