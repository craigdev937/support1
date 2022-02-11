import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please add a Name"]
    },
    email: { 
        type: String, unique: true,
        required: [true, "Please add your Email"]
    },
    password: {
        type: String, 
        required: [true, "Please add a Password"]},
    isAdmin: { type: Boolean, required: true, default: false }
}, {timestamps: true});

export const User = mongoose.model("User", UserSchema);




