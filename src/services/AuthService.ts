import User from "../models/user";
import { compare } from "../utils/handledPassword";
import { tokenSign } from "../utils/handledJwt";
import { NotFoundError } from "../errors/NotFoundError";

export class AuthService {
  public async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: any }> {
    try {
      const user = await User.findOne({ email }).select(
        "email password userName firstName lastName role ships"
      );

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const hashPassword = user.get("password");
      const check = await compare(password, hashPassword);

      if (!check) {
        throw new Error("Password incorrecto");
      }

      user.set("password", undefined, { strict: false });

      return { token: await tokenSign(user), user };
    } catch (error) {
      throw new NotFoundError("An error occurred while logging in");
    }
  }
}
