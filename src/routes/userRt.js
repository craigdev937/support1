import express from "express";
import { HomeIndex } from "../controllers/userCon.js";

export const userRt = express.Router();
    userRt.get("/", HomeIndex);



