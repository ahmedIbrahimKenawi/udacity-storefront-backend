export const usersQueries = {
  index: "select first_name, last_name, email, role from users",

  show: "select first_name, last_name, email, role from users where user_id = $1",

  create: `
    INSERT INTO users (first_name, last_name, email, password, role)
    VALUES ( $1, $2, $3, $4, 'user')
    RETURNING first_name, last_name, email, user_id, role;`,

  getUserByEmail: `SELECT * FROM users WHERE email = $1 `,
};
