import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    registerUser
);

router.route("/login").post(loginUser);
//Protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/getUser").get(verifyJWT, getUser);
export default router;