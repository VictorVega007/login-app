import { SignJWT } from "jose";

const SECRET_KEY = "fake-secret";

export const generateToken = async (email: string): Promise<string> => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);

  const jwt = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);

  return jwt;
};
