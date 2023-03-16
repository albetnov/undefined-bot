import crypto from "crypto";

export default function random<T>(array: T[]): T {
  const randomBuffer = crypto.randomBytes(4);
  const randomIndex = randomBuffer.readUInt32BE(0) % array.length;
  return array[randomIndex];
}
