#!/usr/bin/env node
/**
 * AdamStark.ai Deployment Test Suite
 * Run after every deploy to verify everything works end-to-end.
 * Usage: node scripts/test-deploy.js
 */

const WORKER_URL = "https://adamstark-subscribe.maxwellarmstrong-official.workers.dev";
const SITE_URL = "https://adamstark.ai";
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUB_ID = "pub_091d039f-fedf-47fe-bf70-622f1e8f38f1";
const TEST_EMAIL = `test-deploy-${Date.now()}@mailinator.com`;

let passed = 0;
let failed = 0;

function log(status, name, detail = "") {
  const icon = status === "PASS" ? "✅" : "❌";
  console.log(`${icon} ${status}: ${name}${detail ? ` — ${detail}` : ""}`);
  if (status === "PASS") passed++;
  else failed++;
}

async function test(name, fn) {
  try {
    await fn();
  } catch (err) {
    log("FAIL", name, err.message);
  }
}

async function run() {
  console.log("\n🧪 AdamStark.ai Deploy Test Suite");
  console.log("==================================\n");

  // Test 1: Site is reachable
  await test("Site is live at adamstark.ai", async () => {
    const res = await fetch(SITE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    if (!html.includes("Adam Stark")) throw new Error("Missing brand name in HTML");
    log("PASS", "Site is live at adamstark.ai", `HTTP ${res.status}`);
  });

  // Test 2: Worker is reachable
  await test("Worker endpoint is reachable", async () => {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TEST_EMAIL }),
    });
    if (res.status === 500) throw new Error("Worker returned 500");
    log("PASS", "Worker endpoint is reachable", `HTTP ${res.status}`);
  });

  // Test 3: Email subscription goes through
  await test("Email subscription creates subscriber in Beehiiv", async () => {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TEST_EMAIL }),
    });
    const data = await res.json();
    if (!data.data?.id) throw new Error(`No subscriber ID returned: ${JSON.stringify(data)}`);
    log("PASS", "Email subscription creates subscriber in Beehiiv", `ID: ${data.data.id}`);
  });

  // Test 4: Verify subscriber exists in Beehiiv (if API key available)
  if (BEEHIIV_API_KEY) {
    await test("Subscriber confirmed in Beehiiv API", async () => {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions?email=${encodeURIComponent(TEST_EMAIL)}`,
        { headers: { Authorization: `Bearer ${BEEHIIV_API_KEY}` } }
      );
      const data = await res.json();
      if (!data.data?.length) throw new Error("Subscriber not found in Beehiiv");
      log("PASS", "Subscriber confirmed in Beehiiv API", data.data[0].status);
    });
  }

  // Test 5: CORS headers present
  await test("Worker returns CORS headers", async () => {
    const res = await fetch(WORKER_URL, {
      method: "OPTIONS",
      headers: { Origin: "https://adamstark.ai" },
    });
    const cors = res.headers.get("access-control-allow-origin");
    if (!cors) throw new Error("No CORS headers returned");
    log("PASS", "Worker returns CORS headers", cors);
  });

  // Summary
  console.log("\n==================================");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log("\n⚠️  Deploy has issues — do NOT mark as done until all tests pass.\n");
    process.exit(1);
  } else {
    console.log("\n🚀 All tests passed — deploy is verified.\n");
    process.exit(0);
  }
}

run();
