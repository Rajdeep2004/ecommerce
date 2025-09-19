import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singelCategoryController,
  updateCategoryController,
} from "../controllers/createCategoryController.js";

const router = express.Router();

//create category route for post
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Get all Categories
router.get("/get-category", categoryController);

//get singel Categories
router.get("/singel-category/:slug", singelCategoryController);

//delete for category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
