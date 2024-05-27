import { Router } from "express";
import { bookPackage, getCustomerBookings, getVendorBookings } from "../controllers/bookPackage.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/bookPackage/:id").post(verifyJWT, bookPackage);
router.route("/get-customer-bookings").get(verifyJWT, getCustomerBookings);
router.route("/get-vendor-bookings").get(verifyJWT, getVendorBookings);

export default router;