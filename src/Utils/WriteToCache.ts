import fs from "fs";

export default function writeToCache(fileName: string, content: string) {
  const path = `${__dirname}/../Cache/${fileName}.json`;
  if (fs.existsSync(path)) {
    fs.writeFileSync(path, content);
  }
}
