import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingelProductController,
  productCategoryController,
  productCountController,
  productFillterController,
  productListController,
  productPhotoController,
  relatedProductControlller,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes for the products and taking data for the product using this routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get product
router.get("/get-product", getProductController);

//singel product get

router.get("/get-product/:slug", getSingelProductController);

//get photo

router.get("/product-photo/:pid", productPhotoController);

//deleting product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFillterController);

//count product
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar Product
router.get("/related-products/:pid/:cid", relatedProductControlller);

//category /wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes token getting from braintree

router.get("/braintree/token", braintreeTokenController);

// Example Express route

// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

// router.get("/braintree/token", async (req, res) => {
//   try {
//     const gateway = new braintree.BraintreeGateway({
//       environment: braintree.Environment.Sandbox,
//       merchantId: process.env.BRAINTREE_MERCHANT_ID,
//       publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//       privateKey: process.env.BRAINTREE_PRIVATE_KEY,
//     });

//     const { clientToken } = await gateway.clientToken.generate({});
//     res.send({ clientToken });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
// router.post("/braintree/payment", async (req, res) => {
//   try {
//     const { nonce, cart } = req.body;
//     let total = 0;
//     cart.forEach((item) => {
//       total += Number(item.price);
//     });

//     const result = await gateway.transaction.sale({
//       amount: total.toFixed(2),
//       paymentMethodNonce: nonce,
//       options: { submitForSettlement: true },
//     });

//     if (result.success) {
//       res.send(result);
//     } else {
//       res.status(400).send({ error: result.message });
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

export default router;
