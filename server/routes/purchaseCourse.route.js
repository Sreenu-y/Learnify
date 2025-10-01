import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourses,
  getCourseDetailsWithPurchaseDetails,
  stripeWebhook,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(
  express.raw({
    type: "application/json",
  }),
  stripeWebhook
);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailsWithPurchaseDetails);

router.route("/").get(getAllPurchasedCourses);

export default router;
