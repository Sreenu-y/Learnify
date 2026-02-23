import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourses,
  getCourseDetailsWithPurchaseDetails,
  stripeWebhook,
  verifyPayment,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(
  express.raw({
    type: "application/json",
  }),
  stripeWebhook,
);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailsWithPurchaseDetails);

// Verify payment after Stripe redirects back (no webhook needed in dev)
router.route("/verify-payment").get(isAuthenticated, verifyPayment);

router.route("/").get(getAllPurchasedCourses);

export default router;
