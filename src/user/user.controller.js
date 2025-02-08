//Lógica de negocio

import User from "./user.model.js"
import { checkPassword, encrypt } from "../../utils/encrypt.js";

export const getAll = async(req, res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0) return res.status(404).send({message: 'Users not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Users found: ', 
                users,
                total: users.length
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

//Obtener 1 usuario por su ID
export const get = async(req, res)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                sucess: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

// Actualizar datos de usuario (excepto contraseña)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Evitar que se actualice la contraseña aquí
        if (data.password) {
            return res.status(400).send({ message: "Password can't be updated here" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.send({ message: "User updated successfully", updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error updating user", err });
    }
};

// Actualizar contraseña
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: "User not found" });

        // Verificar si la contraseña actual es correcta
        const isMatch = await checkPassword(user.password, currentPassword);
        if (!isMatch) return res.status(400).send({ message: "Incorrect current password" });

        // Encriptar la nueva contraseña
        user.password = await encrypt(newPassword);
        await user.save();

        return res.send({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error updating password", err });
    }
};

// Eliminar usuario (cambiar estado a false)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: "User not found" });

        // Cambiar el estado a false en lugar de eliminar
        user.status = false;
        await user.save();

        return res.send({ message: "User disabled successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error deleting user", err });
    }
};



// Eliminar un usuario definitivamente
export const deleteUserPermanently = async (req, res) => {
    try {
        const { id } = req.params;

        // Eliminar el usuario de la base de datos
        const deletedUser = await User.deleteOne({ _id: id });

        if (!deletedUser.deletedCount) {
            return res.status(404).send({
                success: false,
                message: 'User not found or already deleted'
            });
        }

        return res.send({
            success: true,
            message: 'User deleted permanently'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'Error deleting user permanently',
            err
        });
    }
};

