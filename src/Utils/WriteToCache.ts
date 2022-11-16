import fs from "fs";

export default function writeToCache(fileName: string, content: string) {
  const path = `${__dirname}/../Cache/${fileName}.json`;
  fs.writeFileSync(path, content);
}
