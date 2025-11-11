#!/usr/bin/env node
import fs from "fs";
const has = fs.existsSync("package-lock.json");
if (has) {
	console.error("package-lock.json present; prefer pnpm. Remove after approval.");
	process.exit(1);
}
console.log("No package-lock.json found.");


