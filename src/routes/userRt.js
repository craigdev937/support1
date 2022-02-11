import express from "express";
import { auth } from "../middleware/auth.js";
import { USER } from "../controllers/userCon.js";

export const userRt = express.Router();
    userRt.post("/register", USER.Register);
    userRt.post("/login", USER.Login);
    userRt.get("/me", auth, USER.GetMe);
    userRt.get("/", USER.FetchAllUsers);



