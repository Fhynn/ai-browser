import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(root, "..");
const distRoot = resolve(appRoot, "dist");

await mkdir(distRoot, { recursive: true });
await copyFile(resolve(appRoot, "manifest.json"), resolve(distRoot, "manifest.json"));
