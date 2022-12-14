export default function env(env: string, defaultValue?: string): string {
  if (!(env in process.env)) {
    if (defaultValue) return defaultValue;
    return "";
  }

  return process.env[env]!;
}

export function toIntEnv(envName: string) {
  return +env(envName);
}

export function setEnv(env: string, value: string) {
  process.env[env] = value;
}
