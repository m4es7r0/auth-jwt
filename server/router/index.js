import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router = new Router();

router.post(
  "/signup",
  body("email", "invalid email").isEmail(),
  body("password", "invalid password min length 6 max: 32").isLength({
    min: 6,
    max: 32,
  }),
  body("fullname", "enter your real name"),
  userController.signUp
);
router.post("/signin", userController.signIn);
router.post("/signout", userController.signOut);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
