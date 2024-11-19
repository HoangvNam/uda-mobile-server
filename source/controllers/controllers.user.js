import User from "../models/models.user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export class UserController {
    static async signup(req, res) {
        try {
            const { username, password } = req.body
            
            const exitingUser = await User.findOne({ username })
            if (exitingUser) {
                return res.status(400).json({message: "Username already exists"})
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                password: hashedPassword
            })
            await newUser.save()

            res.status(201).json({ message: "User registered successfully" })
        } catch (error) {
            res.status(500).json({ message: "Registration failed", error })
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body

            const user = await User.findOne({ username })
            if (!user) {
                res.status(400).json({ message: "User not found" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" })
            }

            const token = jwt.sign({id: user._id}, "secret_key", {
                expiresIn: "1h"
            })

            res.status(200).json({
                message: "Login successful",
                token,
                userId: user._id,
                username: username,
            })
        } catch (error) {
            res.status(500).json({ message: "Login failed", error })
        }
    }

    static async addFavoriteSong(req, res) {
        try {
            const { userId, songId } = req.body

            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            if (user.favorites.includes(songId)) {
                return res.status(400).json({
                    message: "Song is already in favorites",
                    favorites: user.favorites
                })
            }

            user.favorites.push(songId)
            await user.save()

            res.status(200).json({ message: "Song added to favorites", favorites: user.favorites })
        } catch (error) {
            res.status(500).json({ message: "Failed to add favorite song", error })
        }
    }

    static async deleteFavoriteSong(req, res) {
        try {
            const { userId, songId } = req.body

            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            const updatedFavorites = user.favorites.filter(id => id.toString() !== songId)
            if (updatedFavorites.length === user.favorites.length) {
                return res.status(400).json({ message: "Song not found in favorites" })
            }

            user.favorites = updatedFavorites
            await user.save()

            res.status(200).json({ message: "Song removed from favorites", favorites: user.favorites })
        } catch (error) {
            res.status(500).json({ message: "Failed to remove favorite song", error })
        }
    }

    static async getFavoriteSongs(req, res) {
        try {
            const { userId } = req.params

            const user = await User.findById(userId).populate('favorites').lean()
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            res.status(200).json({ favorites: user.favorites })
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch favorites", error })
        }
    }
}