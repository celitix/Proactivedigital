import crypto from "crypto";
import bcrypt from "bcrypt";

export function errorHandler(message: string, status: number = 500) {
  const error: any = new Error();
  error.message = message;
  error.status = status;
  throw error;
}

export function responseHandler(res: any, data: any, status: number = 200) {
  return res.status(status).json(data);
}

export function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

export async function hash(password: string, saltRounds: number = 10) {
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyHash(password: string, storedHash: string) {
  return await bcrypt.compare(password, storedHash);
}
