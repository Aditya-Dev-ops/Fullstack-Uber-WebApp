import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true,
    },
    permit: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    capacity: {
        type: Number,
        required: true,
        min: [2, 'Capacity must be at least 2 passengers'],
        validate: {
            validator: function(value) {
                return Number.isInteger(value) && value >= 2;
            },
            message: props => `${props.value} is not a valid capacity. Capacity must be an integer greater than or equal to 2`
        }
    }
});

// Add index for plate number to ensure uniqueness


export const Vehicle = mongoose.model('Vehicle', VehicleSchema);