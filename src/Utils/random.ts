import crypto from "crypto";

export default function random<T>(array: T[]): T {
  const randomBuffer = crypto.randomBytes(4);
  const randomIndex = randomBuffer.readUInt32BE(0) % array.length;
  return array[randomIndex];
}

const AUTO_ID_LENGTH = 20;
const AUTO_ID_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const maxRandom = AUTO_ID_ALPHABET.length;

export function getRandomGeneratedId() {
  let id = "";
  for (let i = 0; i < AUTO_ID_LENGTH; i++) {
    id += AUTO_ID_ALPHABET[Math.floor(Math.random() * maxRandom)];
  }
  return id;
}
