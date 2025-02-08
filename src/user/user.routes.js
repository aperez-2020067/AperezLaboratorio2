//Rutas de funciones de usuario
import { Router } from 'express'
import { 
    get, 
    getAll,
    updateUser, 
    updatePassword, 
    deleteUser,
    deleteUserPermanently
} from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import {updateValidator, newPasswordValidation} from '../../helpers/validators.js'
import { deleteFileOnErrorUpdate  } from '../../middlewares/delete.file.on.error.js'


const api = Router()

//Rutas privadas
api.get(
    '/asignarCurso', 
    [validateJwt], //Solo accesan esi está logeado],
    getAll
)
api.get(
    '/:id', 
    [validateJwt], //Solo accesan esi está logeado
    get
)
api.put("/update/:id", [ validateJwt, //Solo accesan esi está logeado
    uploadProfilePicture.single('profilePicture'),
    updateValidator,
    deleteFileOnErrorUpdate 
    
    ], updateUser);

api.put("/update-password/:id", [newPasswordValidation], updatePassword);

api.delete("/delete/:id", deleteUser);
// Ruta para eliminar un usuario permanentemente
api.delete("/delete-permanently/:id", deleteUserPermanently);


export default api