import * as crypto from "crypto";
import { env } from "next-runtime-env";

export const encryptClientSide = (plaintext: string) => {
  const encoding: BufferEncoding = "hex";

  // process.env.CRYPTO_KEY should be a 32 BYTE key
  const key: string = env('NEXT_PUBLIC_KeySign') || "";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf-8"),
    cipher.final(),
  ]);

  return iv.toString(encoding) + encrypted.toString(encoding);
};