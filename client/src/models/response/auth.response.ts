import type { IUser } from "../user.type";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
