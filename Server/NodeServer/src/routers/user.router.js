import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUser,getUserById } from "../controllers/user.controller.js";
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
router.route("/get-user-by-id/:id").get(verifyJWT, getUserById);
export default router;