import * as bcrypt from "bcryptjs";
import { pepper, saltRound } from "../../config";

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password + pepper, Number(saltRound));
};

const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password + pepper, hashedPassword);
};

export { hashPassword, comparePassword };
