import User from "../models/user";
import { compare } from "../utils/handledPassword";
import { tokenSign } from "../utils/handledJwt";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class AuthService {
  public async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: any }> {
    const user = await User.findOne({ email }).select(
      "email password userName firstName lastName role ships"
    );

    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }

    const hashPassword = user.get("password");
    const check = await compare(password, hashPassword);

    if (!check) {
      throw new UnauthorizedError("Contraseña incorrecta");
    }

    user.set("password", undefined, { strict: false });

    return { token: await tokenSign(user), user };

  }
}
