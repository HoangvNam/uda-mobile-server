import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                return emailRegex.test(v)
            },
            message: "Username must be a valid email address."

        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length >= 8
            },
            message: "Password must be at least 8 characters long."
        }
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song',
        }
    ]
})

const User = mongoose.model('User', UserSchema)
export default User