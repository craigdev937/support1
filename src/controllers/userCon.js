import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/keys.js";
import { User } from "../models/User.js";

class UserClass {
    Register = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400);
                throw new Error("Please include your info.");
            };
            const userExists = await User.findOne({ email });
            if (userExists) {
                res.status(400);
                throw new Error("User already exists.");
            };
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                name, email, password: hashedPassword
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };

    Login = async (req, res,next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) throw new Error("User not found!");
            const isPassValid = 
            await bcrypt.compare(req.body.password, user.password);
            if (isPassValid) {
                const token = jwt.sign({
                    name: user.name,
                    email: user.email
                }, config.JWT_SECRET)
                return res.status(201).json({user: token});
            }
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };

    GetMe = async (req, res, next) => {
        try {
            const user = {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name
            };
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };

    FetchAllUsers = async (req, res, next) => {
        try {
            await User.find()
            .then((users) => res.json(users));
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };
};

export const USER = new UserClass();





