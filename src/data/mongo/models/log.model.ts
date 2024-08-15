import { model, Schema } from "mongoose";

// la entidad rige la base de datos 

const logSchema = new Schema({

    message: {
        type: String,
        required: true
    },

    origin: {
        type: String,
    },

    level: {
        type: String,
        enum: ['low','medium','high'],
        default: 'low',
    },

    createdAt: {
        type: Date,
        default: new Date()
    },
});

export const LogModel = model('Log', logSchema );     