import { Router } from 'express';
import {  createAppointment,getAppointments, cancelAppointment } from './appointment.controller.js';
import { validateJwt, validateClient } from '../../middlewares/validate.jwt.js';
import {agendarCitaValidation} from "../../helpers/validators.js";

const api = Router();

// 📌 Crear una nueva cita
api.post('/cita', [validateJwt, validateClient,agendarCitaValidation], createAppointment);

// 📌 Obtener todas las citas
api.get('/citaall', getAppointments);

// 📌 Cancelar una cita
api.delete('/cita/cancel/:id', cancelAppointment);

export default api;
