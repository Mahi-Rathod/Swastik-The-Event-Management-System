import { Router } from "express";
import { addCategories, getCategories } from "../controllers/category.controller.js";

const router = Router();

router.route("/add-category").post(addCategories);
router.route("/get-category").get(getCategories);
export default router;