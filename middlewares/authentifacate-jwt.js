const { decodeJWT } = require('../utils/jwt-utils');
const authentificateJWT = ()=> {

/**
 * 
 * @param {BaseSchema} yupValidator 
 * @param {number} errorCode 
 * @returns {(req:Request, res: Response, next:NextFunction) => void}
 */

 return(req, res, next) => {
    //  recuperation du header d'authentifiaction 
      const authHeader = req.hearders['authorization'];
    //   resultat: 'BEARER ;;mlnlùm

    // Recuperation du JWT
    const token = authHeader && authHeader.split(' ')

      console.log(authHeader);
 }

}
module.exports = authentificateJWT;