import { Router } from "express";
import { addProduct, getProducts } from "../controllers/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-product").post(
    verifyJWT,
    upload.fields([
        {
            name : "productImage",
            maxCount:1
        }
    ]),
     addProduct
    );
router.route("/get-product").get(getProducts);

export default router;