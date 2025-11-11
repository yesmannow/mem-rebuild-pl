#!/usr/bin/env node

import fs from "fs";

import express from "express";

import path from "path";

import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const app = express();

app.use(express.json());



const root = path.resolve(__dirname, "..");



// List directory

app.get("/ls", (req, res) => {

  const target = path.join(root, req.query.path || ".");

  const entries = fs.readdirSync(target, { withFileTypes: true });

  res.json(entries.map(e => ({ name: e.name, dir: e.isDirectory() })));

});



// Read file

app.get("/read", (req, res) => {

  const file = path.join(root, req.query.path);

  res.send(fs.readFileSync(file, "utf8"));

});



// Write file

app.post("/write", (req, res) => {

  const file = path.join(root, req.body.path);

  fs.writeFileSync(file, req.body.content, "utf8");

  res.send("ok");

});



// Search text

app.get("/search", (req, res) => {

  const term = req.query.q;

  let results = [];

  function walk(dir) {

    for (const entry of fs.readdirSync(dir)) {

      const full = path.join(dir, entry);

      if (fs.statSync(full).isDirectory()) walk(full);

      else {

        const text = fs.readFileSync(full, "utf8");

        if (text.includes(term)) results.push(full.replace(root + "/", ""));

      }

    }

  }

  walk(root);

  res.json(results);

});



app.listen(3333, () =>

  console.log("✅ MCP Server Running → http://localhost:3333")

);

