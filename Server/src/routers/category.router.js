import { Router } from "express";
import { addCategories, getCategories, getCategoriesById } from "../controllers/category.controller.js";

const router = Router();

router.route("/add-category").post(addCategories);
router.route("/get-category").get(getCategories);
router.route("/get-categorybyid/:id").get(getCategoriesById);
export default router;