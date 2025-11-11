#!/usr/bin/env node
(async () => {
	const base = process.env.MCP_URL || `http://localhost:${process.env.PORT || process.env.MCP_PORT || 5174}`;
	const get = p => fetch(`${base}${p}`).then(r => r);
	// health
	const hr = await get("/health");
	if (!hr.ok) {
		console.error("❌ health failed", hr.status);
		process.exit(1);
	}
	// ls
	const lr = await get("/ls?path=.");
	if (!lr.ok) {
		console.error("❌ ls failed", lr.status);
		process.exit(1);
	}
	// read (README.md when present)
	const rr = await get("/read?path=README.md");
	if (!rr.ok && rr.status !== 400) { // tolerate missing readme
		console.error("❌ read failed", rr.status);
		process.exit(1);
	}
	console.log("✅ MCP smoke tests passed");
})();


