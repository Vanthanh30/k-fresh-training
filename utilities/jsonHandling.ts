import { readFileSync } from 'fs';
import path from 'path';

export function readJsonFile<T = unknown>(filePath: string, env?: string): T {
  const resolvedPath = path.resolve(filePath);
  const rawData = readFileSync(resolvedPath, 'utf8');
  const data = JSON.parse(rawData);

  if (!env) {
    return data as T;
  }

  return data[env.toLowerCase()] as T;
}