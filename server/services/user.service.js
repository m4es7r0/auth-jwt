import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { UserDto } from "../dtos/user.dto.js";
import UserModel from "../models/user.model.js";

import MailService from "../services/mail.service.js";
import TokenService from "../services/token.service.js";

import { ApiError } from "../exeptions/api.errors.js";

class UserService {
  async signUp(email, password, fullname) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("This email is already registered");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuidv4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      fullname,
      activationLink,
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Incorrect activation link");
    }
    user.isActivated = true;
    await user.save();
  }

  async signIn(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("wrong username or password");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("wrong username or password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async singOut(refreshToken) {
    await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    return await UserModel.find();
  }
}

export default new UserService();
