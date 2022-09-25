import { Request, Response } from "express";
import Users, { User } from "../models/users";
import { hashPassword, comparePassword } from "./utils/encrypt";
import { generateToken } from "./utils/token";

const users = new Users();

async function create(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const newUser = await users.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser);
    res.json({ token });
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password }: User = req.body;
    const user = await users.getUserByEmail(email);
    // is user in database ?
    if (!user) {
      throw Error("Wrong Email");
    }
    // validate password
    if (
      !comparePassword(password as string, user.password as unknown as string)
    ) {
      throw Error("Wrong Password");
    }
    // create token for valid user
    const token = generateToken(user as User);
    res.json({ token });
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function index(req: Request, res: Response) {
  try {
    const allUsers = await users.index();
    res.json(allUsers);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
}

async function show(req: Request, res: Response) {
  try {
    const user_id = parseInt(req.params.id as string);
    const user = await users.show(user_id);
    if (!user) throw Error(`No user with id ${user_id}`);
    res.json(user);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
}

export default {
  login,
  create,
  index,
  show,
};
