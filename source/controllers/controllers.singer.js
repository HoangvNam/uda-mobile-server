import Singer from "../models/models.singer.js";


export class SingerController {
    static async getSingers(req, res) {
        try {
            const singers = await Singer.find()
            res.json(singers)
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving singer data." })
        }
    }
}