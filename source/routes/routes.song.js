import { SongController } from "../controllers/controllers.song.js";


export function routeSong(app) {
    app.get("/get-songs", SongController.getSongs)
}