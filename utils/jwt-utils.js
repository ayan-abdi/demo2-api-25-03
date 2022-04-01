const jwt = require('jsonwebtoken');
// une const qui recoit une fonction qui contiendra un objet
// const generateJWT = ({ id, pseudo, isAdmin }) => {

//     const data = { id, pseudo, isAdmin };
//     const secret = process.env.JWT_SECRET;
//     const audience = process.env.JWT_AUDIENCE;
//     const issuer = process.env.JWT_ISSUER;
//     const expiresIn = '1h';

//     const token = jwt.sign(data, secret, {
//         audience,
//         issuer,
//         expiresIn,
//         algorithm: 'HS512' //HS256 par default
//     });
//     const expire = new Date(jwt.decode(token).exp * 1000).toISOString();
//     // return {
//     //     token,
//     //     expire: 
//     // };

// };
// const decodeJWT = (token) => {
//     if (!token) {
//         throw new Error('Indalid JWT');
//     }
//     const  optionsVerify = {
//         audience: process.env.JWT_AUDIENCE,
//         issuer: process.env.JWT_ISSUER,
//     };
//     return jwt.verify(token, process.env.JWT_SECRET, optionsVerify);

// }; METHODE REFAITE PAR LE FORMATEUR, 
const generateJWT = ({ id, pseudo, isAdmin }) => {
    return new Promise((resolve, reject) => {
        const data = { id, pseudo, isAdmin };
        const secret = process.env.JWT_SECRET;
        const options = {
            algorithm: 'HS512',  // HS256 par default
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
            expiresIn: '12h'    // Format: https://github.com/vercel/ms
        };

        jwt.sign(data, secret, options, (error, token) => {
            if (error) {
                return reject(error);
            }

            const expire = new Date(jwt.decode(token).exp * 1000).toISOString();
            resolve({ token, expire });
        });
    });
};

const decodeJWT = (token) => {
    if (!token) {
        return Promise.reject(new Error('Indalid JWT'));
    }

    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET;
        const optionsVerify = {
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
        };
        jwt.verify(token, secret, optionsVerify, (error, data) => {
            if (error) {
                return reject(error);
            }

            resolve({
                id: data.id,
                pseudo: data.pseudo,
                isAdmin: data.isAdmin
            });
        });
    });
};
module.exports = {
    generateJWT,
    decodeJWT
};