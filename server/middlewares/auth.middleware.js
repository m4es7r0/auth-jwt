import { ApiError } from "../exeptions/api.errors.js";
import TokenService from "../services/token.service.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.UnauthorizedError());

    const accessToken = authorizationHeader.replace("Bearer ", "");
    if (!accessToken) return next(ApiError.UnauthorizedError());

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.UnauthorizedError());

    req.user = userData;
    next();
  } catch (error) {
    throw ApiError.UnauthorizedError();
  }
};
