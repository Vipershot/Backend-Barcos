import { NotFoundError } from "../errors/NotFoundError";
import User from "../models/user";
import { tokenSign } from "../utils/handledJwt";
import { encrypt } from "../utils/handledPassword";

export class RegisterService {
  public async register(
    email: string,
    password: string,
    userName: string,
    firstName: string,
    lastName: string,
    age: string
  ): Promise<{ token: string; user: any }> {
    try {
      const passwordHash = await encrypt(password);
      const body = {
        email,
        password: passwordHash,
        userName,
        firstName,
        lastName,
        age,
      };
      const user = await User.create(body);

      user.set("password", undefined, { strict: false });

      const data = {
        token: await tokenSign(user),
        user: user,
      };

      return data;
    } catch (error) {
      throw new NotFoundError("An error occurred while registering");
    }
  }
}
