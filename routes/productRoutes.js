import express from "express";
import { protect, admin } from "../src/middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/:id", protect, admin, getProductById);

export default router;
