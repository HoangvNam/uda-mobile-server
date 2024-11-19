import { AdminController, ensureAdmin } from "../controllers/controllers.admin.js";


export function routeAdmin(app) {
    app.get("/admin/dashboard", ensureAdmin, AdminController.showAdminPage)
    app.get("/admin/register", AdminController.showRegisterAdmin)
    app.get("/admin/login", AdminController.showLoginAdmin)
    app.get("/delete-admin/:id", ensureAdmin, AdminController.deleteAdmin)
    app.get("/admins", ensureAdmin, AdminController.showAdmins)

    app.post("/admin/register", AdminController.registerAdmin)
    app.post("/admin/login", AdminController.loginAdmin)

    // -----------------------------------------------------------------------------

    app.get("/songs", ensureAdmin, AdminController.showSongs)
    app.get("/add-song", ensureAdmin, AdminController.showAddSong)
    app.get("/edit-song/:id", ensureAdmin, AdminController.showEditSong)

    app.post("/add-song", ensureAdmin, AdminController.addSong)
    app.post("/edit-song/:id", ensureAdmin, AdminController.updateSong)
    app.post("/delete-song/:id", ensureAdmin, AdminController.deleteSong)

    // -----------------------------------------------------------------------------

    app.get("/singers", ensureAdmin, AdminController.showSingers)
    app.get("/add-singer", ensureAdmin, AdminController.showAddSinger)
    app.get("/edit-singer/:id", ensureAdmin, AdminController.showEditSinger)

    app.post("/add-singer", ensureAdmin, AdminController.AddSinger)
    app.post("/edit-singer/:id", ensureAdmin, AdminController.updateSinger)
    app.post("/delete-singer/:id", ensureAdmin, AdminController.deleteSinger)

    // -----------------------------------------------------------------------------

    app.get("/users", ensureAdmin, AdminController.showUsers)
    app.get("/edit-user/:id", ensureAdmin, AdminController.showEditUser)

    app.post("/edit-user/:id", ensureAdmin, AdminController.updateUser)
    app.post("/delete-user/:id", ensureAdmin, AdminController.deleteUser)

    // -----------------------------------------------------------------------------
}