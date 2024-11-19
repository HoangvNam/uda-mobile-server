import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return emailRegex.test(v);
            },
            message: "Username must be a valid email address.",
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length >= 8;
            },
            message: "Password must be at least 8 characters long.",
        },
    },
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;