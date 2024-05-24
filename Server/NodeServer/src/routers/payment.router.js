import { Router } from 'express';
import { createOrder } from "../controllers/payment.controller.js"
const router = Router();

router.route("/createOrder").post(createOrder);

export default router;