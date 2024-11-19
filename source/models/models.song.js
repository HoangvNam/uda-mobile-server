import mongoose from "mongoose";


const SongSchema = new mongoose.Schema({
    audio: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    singer: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{2}:\d{2}$/.test(v)
            },
            message: props => `${props.value} không đúng định dạng mm:ss!`
        }
    },
})

const Song = mongoose.model('Song', SongSchema)
export default Song