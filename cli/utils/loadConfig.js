"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
function loadConfig() {
    var configPath = node_path_1.default.join(process.cwd(), 'cli/cli.config.json');
    if (!node_fs_1.default.existsSync(configPath)) {
        throw new Error("\u274C CLI config not found at ".concat(configPath));
    }
    var raw = node_fs_1.default.readFileSync(configPath, 'utf-8');
    try {
        return JSON.parse(raw);
    }
    catch (err) {
        throw new Error("\u274C Failed to parse CLI config: ".concat(err));
    }
}
