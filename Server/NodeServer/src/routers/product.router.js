import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";