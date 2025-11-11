"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = __importDefault(require("node:fs"));
var axios_1 = __importDefault(require("axios"));
var loadConfig_1 = require("@config/loadConfig");
var resumeBuilder_1 = require("@utils/resumeBuilder");
var config = (0, loadConfig_1.loadConfig)();
var args = process.argv.slice(2);
var outputArg = args[args.indexOf('--output') + 1] || "".concat(config.outputDir, "/resume.html");
var themeArg = args[args.indexOf('--theme') + 1] || 'modern';
var useRemote = args.includes('--remote');
var dataPath = config.resumeData || 'data/resume.json';
var resumeData = JSON.parse(node_fs_1.default.readFileSync(dataPath, 'utf-8'));
if (useRemote) {
    var res = await axios_1.default.post('http://localhost:8000/generate-resume', {
        theme: themeArg,
        data: resumeData
    });
    node_fs_1.default.writeFileSync(outputArg, res.data.html);
    console.log("\uD83C\uDF10 R\u00E9sum\u00E9 HTML via MCP \u2192 ".concat(outputArg));
}
else {
    var html = (0, resumeBuilder_1.buildResumeHTML)(resumeData, themeArg);
    node_fs_1.default.writeFileSync(outputArg, html);
    console.log("\u2705 R\u00E9sum\u00E9 HTML generated \u2192 ".concat(outputArg));
}
