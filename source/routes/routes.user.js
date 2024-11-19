import { UserController } from "../controllers/controllers.user.js";


export function routeUser(app) {
    app.get("/get-favorite-songs/:userId", UserController.getFavoriteSongs)

    app.post("/register", UserController.signup)
    app.post("/login", UserController.login)
    app.post("/favorite-song", UserController.addFavoriteSong)

    app.delete("/favorite-song", UserController.deleteFavoriteSong)
}