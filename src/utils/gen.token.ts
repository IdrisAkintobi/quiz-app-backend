import jwt from "jsonwebtoken";

function genToken(data: string) {
  return jwt.sign({ id: data }, process.env.JWT_SECRET as string, {
    expiresIn: "12h",
  });
}

export default genToken;
