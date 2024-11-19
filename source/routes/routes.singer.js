import { SingerController } from "../controllers/controllers.singer.js";


export function routeSinger(app) {
    app.get("/get-singers", SingerController.getSingers)
}