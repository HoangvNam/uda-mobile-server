import Song from "../models/models.song.js";


export class SongController {
    static async getSongs(req, res) {
        try {
            const songs = await Song.find()
            res.json(songs)
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving song data." })
        }
    }
}