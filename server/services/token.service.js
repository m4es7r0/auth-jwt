import jwt from "jsonwebtoken";
import TokenModel from "../models/token.model.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: 60 * 30,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    await TokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken) {
    return await TokenModel.findOne({ refreshToken });
  }
}

export default new TokenService();
