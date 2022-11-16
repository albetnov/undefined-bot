import fs from "fs";

interface KeyValueSchema {
  name: string;
  value: string;
}

export function getCache(fileName: string): object[] {
  const path = `${__dirname}/../Cache/${fileName}.json`;
  let result = [{}];
  if (fs.existsSync(path)) {
    result = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" })) as object[];
  }
  return result;
}

export function getCacheByKey(fileName: string, key: string): string {
  const result = getCache(fileName);
  return (result.filter((item: any) => item.name === key)[0] as KeyValueSchema).value;
}
