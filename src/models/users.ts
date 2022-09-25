import { pg_query } from "./_database/pg_query";

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
      const sql = "select first_name, last_name, email, role from users";
      const result = await pg_query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get all users. Error: ${error}`);
    }
  }

  // show user by id
  async show(user_id: number): Promise<User> {
    try {
      const sql =
        "select first_name, last_name, email, role from users where user_id = $1";
      const result = await pg_query(sql, [user_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user by id:${user_id}. Error: ${error}`);
    }
  }

  // create new user
  async create({ first_name, last_name, email, password }: User) {
    try {
      const sql = `
      INSERT INTO users (first_name, last_name, email, password, role)
      VALUES ( $1, $2, $3, $4, 'user')
      RETURNING first_name, last_name, email, user_id, role;
      `;

      const result = await pg_query(sql, [
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
      const sql = `SELECT * FROM users WHERE email = $1 `;
      const result = await pg_query(sql, [email]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user with Email: ${email}.`);
    }
  }
}
