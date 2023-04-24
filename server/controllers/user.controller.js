import { validationResult } from "express-validator";
import { ApiError } from "../exeptions/api.errors.js";

import UserService from "../services/user.service.js";

class UserController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("validation error", errors.array()));
      }

      const { email, password, fullname } = req.body;
      const userData = await UserService.signUp(email, password, fullname);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      next(e);
      // res.status(400).json({ success: false });
    }
  }
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.signIn(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async signOut(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await UserService.singOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.status(200).redirect(process.env.CLIENT_URL);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new UserController();
