import Admin from "../models/models.admin.js";
import Singer from "../models/models.singer.js";
import Song from "../models/models.song.js";
import User from "../models/models.user.js";
import bcrypt from "bcrypt"


export class AdminController {
    static showAdminPage(req, res) {
        res.render("admin-page", { title: "Admin Page"})
    }

    static async showSongs(req, res) {
        try {
            const songs = await Song.find().lean()
            res.render("songs", { title: 'Songs', songs })
        } catch (error) {
            res.status(500).send("Error fetching songs: " + error.message)
        }
    }

    static showAddSong(req, res) {
        res.render("add-song", { title: "Add Song"})
    }

    static async addSong(req, res) {
        try {
            const { audio, image, name, singer, time } = req.body
            const newSong = new Song({ audio, image, name, singer, time })
            await newSong.save()
            res.redirect("/add-song")
            console.log("Added song successfully")
        } catch (error) {
            res.status(500).send("Error adding song: " + error.message)
        }
    }

    static async deleteSong(req, res) {
        try {
            const { id } = req.params
            await Song.findByIdAndDelete(id)
            res.redirect('/songs')
        } catch (error) {
            res.status(500).send("Error deleting song: " + error.message);
        }
    }

    static async showEditSong(req, res) {
        try {
            const { id } = req.params;
            const song = await Song.findById(id).lean();
            if (!song) {
                return res.status(404).send("Song not found");
            }
            res.render("edit-song", { title: "Edit Song", song });
        } catch (error) {
            res.status(500).send("Error fetching song: " + error.message);
        }
    }

    static async updateSong(req, res) {
        try {
            const { id } = req.params;
            const { audio, image, name, singer, time } = req.body;

            await Song.findByIdAndUpdate(id, { audio, image, name, singer, time });
            res.redirect("/songs");
        } catch (error) {
            res.status(500).send("Error updating song: " + error.message);
        }
    }

    // -----------------------------------------------------------------------------

    static async showUsers(req, res) {
        try {
            const users = await User.find()
                .populate("favorites") 
                .lean();
    
            res.render("users", { title: "Users", users })
        } catch (error) {
            res.status(500).send("Error fetching users: " + error.message)
        }
    }

    static async showEditUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id).lean();
            if (!user) {
                return res.status(404).send("User not found");
            }
            res.render("edit-user", { title: "Edit User", user });
        } catch (error) {
            res.status(500).send("Error fetching user: " + error.message);
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, password } = req.body;

            await User.findByIdAndUpdate(id, { username, password });
            res.redirect("/users");
        } catch (error) {
            res.status(500).send("Error updating user: " + error.message);
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            await User.findByIdAndDelete(id)
            res.redirect("/users")
        } catch (error) {
            res.status(500).send("Error deleting user: " + error.message)
        }
    }

    // -----------------------------------------------------------------------------

    static showAddSinger(req, res) {
        res.render("add-singer", { title: "Add Singer" })
    }

    static async AddSinger(req, res) {
        try {
            const { avatar, name, numberSongs } = req.body
            const newSinger = new Singer({ avatar, name, numberSongs })
            await newSinger.save()
            res.redirect("/add-singer")
        } catch (error) {
            res.status(500).send("Error adding singer: " + error.message)
        }
    }

    static async showSingers(req, res) {
        try {
            const singers = await Singer.find().lean()
            res.render("singers", { title: "Singers", singers })
        } catch (error) {
            res.status(500).send("Error fetching singers" + error.message)
        }
    }

    static async showEditSinger(req, res) {
        try {
            const { id } = req.params
            const singer = await Singer.findById(id).lean()
            if (!singer) {
                return res.status(404).send("Singer not found")
            }
            res.render("edit-singer", { title: "Edit Singer", singer })
        } catch (error) {
            res.status(500).send("Error fetching singer: " + error.message)
        }
    }

    static async updateSinger(req, res) {
        try {
            const { id } = req.params
            const { avatar, name, numberSongs } = req.body
    
            await Singer.findByIdAndUpdate(id, { avatar, name, numberSongs })
            res.redirect("/singers")
        } catch (error) {
            res.status(500).send("Error updating singer: " + error.message)
        }
    }

    static async deleteSinger(req, res) {
        try {
            const { id } = req.params
            await Singer.findByIdAndDelete(id)
            res.redirect("/singers")
        } catch (error) {
            res.status(500).send("Error deleting singer: " + error.message)
        }
    }

    static showRegisterAdmin(req, res) {
        res.render("admin-register", { title: "Admin Registration"})
    }

    static async registerAdmin(req, res) {
        try {
            const { username, password } = req.body;

            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin) {
                return res.status(400).send("Admin with this email already exists.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new Admin({
                username,
                password: hashedPassword,
            });

            await newAdmin.save();
            res.redirect("/admin/login");
        } catch (error) {
            res.status(500).send("Error registering admin: " + error.message);
        }
    }

    static showLoginAdmin(req, res) {
        res.render("admin-login", { title: "Admin Login" })
    }

    static async loginAdmin(req, res) {
        try {
            const { username, password } = req.body;

            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(400).send("Invalid email or password.");
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(400).send("Invalid email or password.");
            }

            req.session.adminId = admin._id;
            res.redirect("/admin/dashboard");
        } catch (error) {
            res.status(500).send("Error logging in admin: " + error.message);
        }
    }

    static async showAdmins(req, res) {
        try {
            const admins = await Admin.find().lean(); // Lấy danh sách tất cả admin
            res.render("admins", { title: "Admin List", admins });
        } catch (error) {
            res.status(500).send("Error fetching admins: " + error.message);
        }
    }

    static async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            if (req.session.adminId === id) {
                return res.status(400).send("You cannot delete yourself.");
            }
    
            await Admin.findByIdAndDelete(id);
            res.redirect("/admins");
        } catch (error) {
            res.status(500).send("Error deleting admin: " + error.message);
        }
    }
}


export function ensureAdmin(req, res, next) {
    if (req.session.adminId) {
        Admin.findById(req.session.adminId)
            .then((admin) => {
                if (admin) {
                    req.admin = admin;
                    next();
                } else {
                    res.status(403).send("Access denied.");
                }
            })
            .catch((error) => res.status(500).send("Error verifying admin: " + error.message));
    } else {
        res.redirect("/admin/login");
    }
}