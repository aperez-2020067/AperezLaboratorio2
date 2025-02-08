import { Schema, model } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String,
        maxLegth:[35, `Can't be overcome 35 characters` ],
        required: [true, 'Name is required']
    },
    description:{
        type: String,
        required: [true, 'Description is required']

    },
    age: {
        type: String,
        maxLegth:  [10, `Can't be overcome 10 characters` ],
        required: [true,'Age is required']
    },
    type: {
        type: String,
        uppercase: true,
        required: [true, 'Type is required']

    },
    keeper:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:[true, 'keeper is required']

    },
    status:{
        type: Boolean,
        default: true,
        required: [true, 'Status is required']


    },
    
},
{
 versionKey:  false,//Desahabilitar el _v(version de documento)
 timestamp: true //Agreagr propiedades de fecha
}

);

export default model("Animal", animalSchema);
