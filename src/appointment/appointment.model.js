import { Schema, model } from 'mongoose'

const appointmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: [true, 'Animal ID is required']
    },
    date: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    reason: {
        type: String,
        required: [true, 'Reason for appointment is required']
    },
    status: {
        type: Boolean,
        default: true // true = activa, false = cancelada
    }
}, { timestamps: true });

export default model('Appointment', appointmentSchema);

