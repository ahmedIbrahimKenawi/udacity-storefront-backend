import * as jwt from "jsonwebtoken";
import { User } from "../../models/users";
import { TOKEN_SECRET } from "../../config";

function generateToken({
  first_name,
  last_name,
  email,
  user_id,
  role,
}: User): string {
  return jwt.sign(
    { first_name, last_name, email, user_id, role },
    TOKEN_SECRET as string,
    {
      noTimestamp: true,
    }
  );
}

export { generateToken };
