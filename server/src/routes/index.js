import express from "express";
import * as userController from "../controllers/userController.js";

// create a router
const router = express.Router();

router.post("/login", userController.login);
router.post("/signup", userController.signup);

export default router;
