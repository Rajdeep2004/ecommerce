import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//akna amara route banabo using express mana ata dia amara user ki korta chia6a sata janata parbo r tar uttor janata parbo amar

const router = express.Router();

//routing

//registration korta post method use hoba,ata r maddhyama ami akta resgistration from dara user r resgistration nita parbo ||method use hoba post
router.post("/register", registerController);

//post method use kora akta login page create hoba jata help korba login r jonno kono user k akna tar route ta creae kora hoba jata dara user ra tar login page ta

router.post("/login", loginController);

//Forgot Password ||  Post
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Routes for user authentication
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Routes for admin authentication

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//All orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Get all users || GET
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

export default router;
