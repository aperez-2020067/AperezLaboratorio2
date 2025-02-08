import Animal from "./animal.model.js";
import User from '../user/user.model.js'

//Función para registrar un animal
export const addAnimal = async(req, res) => {
    const data = req.body
    try {
        const user = await User.findOne(
            { 
                _id:data.keeper,
                role: 'Admin' 
            
            })
 
        if (!user) return res.status(403).send({ sucess:false,
            message: 'keeper not found access denied'})
        const animal = new Animal(data)
 
        await animal.save()
        return res.send({success:true,
            message: `${animal.name} saved successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false,
            message: 'General error when adding animal'})
    }
}

// Obtener todos los animales
export const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate("keeper", "name username");
        return res.send({ message: "Animals retrieved successfully", animals });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error retrieving animals", err });
    }
};

// Obtener un animal por ID
export const getAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findById(id).populate("keeper", "name username");

        if (!animal) return res.status(404).send({ message: "Animal not found" });

        return res.send({ message: "Animal retrieved successfully", animal });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error retrieving animal", err });
    }
};
