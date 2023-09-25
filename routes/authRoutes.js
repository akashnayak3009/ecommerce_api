import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User Already exist! login for this." });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json({ newUser });
    } catch (error) {
        res.status(500).json(error);
    }
});

//Login

router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            res.status(401).json("Wrong Username");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {
                    expiresIn: "3d"
                }
            );

            const { password, ...others } = user._doc; // password is not visible in mongodb document;
            return res.status(200).json({...others, accessToken});
        } else {
            return res.status(401).json({ message: "Invalid Password" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
