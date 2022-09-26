import { pg_query } from "./_database/pg_query";
import { usersQueries } from "./sql/users";

export interface User {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role?: string;
}

export default class Users {
  // list all users
  async index() {
    try {
      const result = await pg_query(usersQueries.index);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get all users. Error: ${error}`);
    }
  }

  // show user by id
  async show(user_id: number): Promise<User> {
    try {
      const result = await pg_query(usersQueries.show, [user_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user by id:${user_id}. Error: ${error}`);
    }
  }

  // create new user
  async create({ first_name, last_name, email, password }: User) {
    try {
      const result = await pg_query(usersQueries.create, [
        first_name,
        last_name,
        email,
        password as string,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create new users with Email:${error}`);
    }
  }

  // login / authentication
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await pg_query(usersQueries.getUserByEmail, [email]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user with Email: ${email}.`);
    }
  }
}
