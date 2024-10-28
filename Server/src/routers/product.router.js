import { Router } from "express";
import { addProduct, getProducts, getProductById, getProductByCategory } from "../controllers/product.controller.js";
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
router.route("/get-product-by-id/:id").get(
    verifyJWT,
    getProductById
)
router.route("/get-products").get(getProducts);
router.route("/get-products-by-category/:id").get(getProductByCategory);
export default router;