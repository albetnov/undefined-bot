import fs from "fs";

interface KeyValueSchema {
  name: string;
  value: string;
}

export function getCache(fileName: string): KeyValueSchema[] {
  const path = `${__dirname}/../Cache/${fileName}.json`;
  let result = [{ name: "", value: "" }];
  if (fs.existsSync(path)) {
    result = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
  }
  return result;
}

export function getCacheByKey(fileName: string, key: string): string {
  const result = getCache(fileName);
  return result.filter((item: KeyValueSchema) => item.name === key)[0].value;
}
