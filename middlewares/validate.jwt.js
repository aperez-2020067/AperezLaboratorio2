//Middleware de validación de tokens
'use strict'

import jwt from 'jsonwebtoken'

//Validar que venga un token válido y no haya expirado
export const validateJwt = async(req, res, next)=>{
    try{
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers
        let { authorization } = req.headers
        //verificar si viene el token
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        //Desencriptar el token
        let user = jwt.verify(authorization, secretKey)
        //Inyectar la información del usuario a la solicitud
        req.user = user
        //Todo salió bien, pase a la siguiente función
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

export const validateClient = (req, res, next) => {
    try {
        if (req.user.role !== "CLIENT") {
            return res.status(403).send({ message: "Access denied. Only clients can create appointments." });
        }
        next(); // Si es CLIENT, continuar con la petición
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error validating role" });
    }
};
