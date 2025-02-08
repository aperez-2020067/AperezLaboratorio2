import Appointment from './appointment.model.js'
import User from '../user/user.model.js'
import Animal from '../animal/animal.model.js'
 

// 📌 Crear una cita

export const createAppointment = async (req, res) => {
    try {
        // El usuario ya viene en el token gracias a validateJwt.js
        const userId = req.user.uid;  // Extraemos el ID del usuario autenticado desde el token
        const { animalId, date, reason } = req.body;  // Solo recibimos animalId, fecha y hora

        // Validaciones
        if (!animalId || !date || !reason) {
            return res.status(400).send({ message: 'All fields are required: animalId, date, and reason' });
        }

        // Verificar que el animal existe
        const animal = await Animal.findById(animalId);
        if (!animal) {
            return res.status(404).send({ message: 'Animal not found' });
        }

        // Verificar que el usuario no tenga otra cita con el mismo animal
        const existingAppointment = await Appointment.findOne({ user: userId, animal: animalId });
        if (existingAppointment) {
            return res.status(400).send({ message: 'You already have an appointment for this animal' });
        }

        // Verificar que el usuario no tenga otra cita el mismo día
        const sameDayAppointment = await Appointment.findOne({ user: userId, date });
        if (sameDayAppointment) {
            return res.status(400).send({ message: 'You already have an appointment on this date' });
        }

        // Crear nueva cita
        const newAppointment = new Appointment({
            user: userId,  // Ya no lo recibimos en el body, lo extraemos del token
            animal: animalId,
            date,
            reason
        });

        // Guardar en la BD
        await newAppointment.save();

        return res.status(201).send({ message: 'Appointment scheduled successfully', newAppointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating appointment', err });
    }
};


// 📌 Obtener todas las citas
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('user', 'name').populate('animal', 'name');

        if (!appointments.length) return res.status(404).send({ message: 'No appointments found' });

        return res.send({ message: 'Appointments retrieved successfully', appointments });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving appointments', error: err.message });
    }
};

// 📌 Cancelar una cita
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).send({ message: 'Appointment not found' });

        appointment.status = false;
        await appointment.save();

        return res.send({ message: 'Appointment cancelled successfully', appointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error cancelling appointment', error: err.message });
    }
};
