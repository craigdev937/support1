import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { config } from "../config/keys.js";

export const auth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = await User.findById(decoded.id)
                .select("-password");
            next();
        } catch (error) {
            res.status(401).json({msg: error.message});
        }
    };
};




