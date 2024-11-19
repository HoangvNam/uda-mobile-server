import mongoose from "mongoose";


const singerSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    numberSongs: {
        type: Number,
        default: 0,
    }
})

const Singer = mongoose.model("Singer", singerSchema)
export default Singer