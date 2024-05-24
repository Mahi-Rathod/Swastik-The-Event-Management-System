import { Router } from "express";
import { bookPackage } from "../controllers/bookPackage.controller.js";

const router = Router();

router.route("/bookPackage/:id").post(bookPackage);

export default router;