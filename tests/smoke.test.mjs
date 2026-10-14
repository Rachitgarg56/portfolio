import assert from "node:assert/strict";
import test from "node:test";

// Run against `npm start`, never next dev: this checks production output.
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const routes = ["/", "/work/sringeri-net", "/work/asset-management-system", "/work/papertrail", "/work/unstuck"];
const mediaFiles = ["/media/papertrail-demo.mp4", "/media/unstuck-demo.mp4"];
const pages = new Map();

function attribute(tag, name) {
  return tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1]?.replaceAll("&amp;", "&");
}

async function request(path) {
  return fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000) });
}

for (const route of routes) {
  const response = await request(route);
  pages.set(route, { response, html: await response.text() });
}

test("pages have landmarks, unique IDs, valid labels and route-specific metadata", () => {
  const titles = new Set();
  for (const [route, { response, html }] of pages) {
    assert.equal(response.status, 200, route);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one h1`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${route}: one main`);
    assert.match(html, /<html[^>]*lang="en"/);
    assert.match(html, /<nav[^>]*aria-label="Main navigation"/);
    assert.match(html, /href="#main-content"/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);
    for (const match of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
      for (const id of match[1].split(/\s+/)) assert.ok(ids.includes(id), `${route}: label ${id}`);
    }
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title?.includes("Rachit Garg"), `${route}: title`);
    titles.add(title);
    const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => match[0]);
    assert.ok(metas.some((tag) => attribute(tag, "name") === "description" && attribute(tag, "content")));
    assert.ok(metas.some((tag) => attribute(tag, "property") === "og:image"));
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]).find((tag) => attribute(tag, "rel") === "canonical");
    if (publicOrigin) assert.equal(new URL(attribute(canonical || "", "href")).href, new URL(route, publicOrigin).href);
    else assert.equal(canonical, undefined, "Do not invent a canonical domain");
    assert.doesNotMatch(html, /Selected work and case studies will follow|href="#"/);
  }
  assert.equal(titles.size, routes.length, "Every page has its own title");
});

test("every internal navigation link and fragment resolves", () => {
  for (const [route, { html }] of pages) {
    for (const match of html.matchAll(/<a\b[^>]*>/g)) {
      const href = attribute(match[0], "href");
      assert.ok(href, `${route}: link has a destination`);
      const url = new URL(href, new URL(route, origin));
      if (url.origin !== new URL(origin).origin) continue;
      if (mediaFiles.includes(url.pathname)) continue; // Checked with range requests below.
      const target = pages.get(url.pathname);
      assert.ok(target, `${route}: ${href} points to a built page`);
      if (url.hash) assert.ok(target.html.includes(`id="${url.hash.slice(1)}"`), `${route}: ${href} fragment exists`);
    }
  }
});

test("all linked styles, scripts, fonts and social images are served", async () => {
  const assets = new Set();
  const socialImages = new Set();
  for (const { html } of pages.values()) {
    for (const match of html.matchAll(/<(?:link|script)\b[^>]*>/g)) {
      const path = attribute(match[0], "href") || attribute(match[0], "src");
      if (path?.startsWith("/_next/") || path?.startsWith("/icon.svg")) assets.add(path);
    }
    for (const match of html.matchAll(/<meta\b[^>]*>/g)) {
      if (attribute(match[0], "property") === "og:image") {
        const url = new URL(attribute(match[0], "content"));
        socialImages.add(url.pathname + url.search);
      }
    }
  }
  assert.equal(socialImages.size, routes.length, "Route-specific social images");
  for (const path of assets) assert.equal((await request(path)).status, 200, path);
  for (const path of socialImages) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type"), /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
});

test("unknown pages and projects return real 404 responses", async () => {
  for (const path of ["/missing", "/work/missing", "/work/missing/opengraph-image"]) {
    const response = await request(path);
    assert.equal(response.status, 404, path);
  }
});

test("sitemap and crawl policy depend on the configured public origin", async () => {
  const sitemap = await (await request("/sitemap.xml")).text();
  const robots = await (await request("/robots.txt")).text();
  if (publicOrigin) {
    for (const route of routes) assert.ok(sitemap.includes(new URL(route, publicOrigin).href));
    assert.match(robots, /Allow: \//);
    assert.ok(robots.includes(new URL("/sitemap.xml", publicOrigin).href));
  } else {
    assert.doesNotMatch(sitemap, /<loc>/);
    assert.match(robots, /Disallow: \//);
  }
});

test("reported results and approximation qualifiers remain in the HTML", () => {
  const sringeri = pages.get("/work/sringeri-net").html;
  const assets = pages.get("/work/asset-management-system").html;
  for (const value of ["3.6", "2.1", "78", "95", "82", "96", "18%", "40+", "15+"]) assert.ok(sringeri.includes(value), value);
  for (const value of ["25%", "30%", "Approximately", "backend authorization"]) assert.ok(assets.includes(value), value);
  assert.ok(sringeri.includes("Approximately"));
});

test("independent products have real destinations, clear source visibility and no fabricated metrics", () => {
  const home = pages.get("/").html;
  const papertrail = pages.get("/work/papertrail").html;
  const unstuck = pages.get("/work/unstuck").html;
  for (const html of [home, papertrail]) {
    assert.ok(html.includes('href="https://support-agent-beige-iota.vercel.app/"'));
    assert.ok(html.includes('href="https://github.com/Rachitgarg56/support-agent"'));
  }
  for (const html of [home, unstuck]) {
    assert.ok(html.includes('href="https://unstuck-black.vercel.app/"'));
    assert.ok(html.includes("Source private"));
    assert.doesNotMatch(html, /href="https:\/\/github\.com\/Rachitgarg56\/Unstuck"/);
  }
  assert.ok(papertrail.includes('href="https://medium.com/@rachitgarg56/building-papertrail-a-production-minded-rag-document-q-a-app-e3f799b0ace3"'));
  for (const html of [papertrail, unstuck]) {
    assert.ok(html.includes("Personal"));
    assert.doesNotMatch(html, /id="results-title"/);
  }
  assert.doesNotMatch(unstuck, /aria-label="Project technologies"/);
  assert.doesNotMatch(home, /<video\b|<audio\b|<iframe\b|as="video"|as="audio"/);
});

test("images are optimized, dimensioned and load according to placement; recordings support seeking", async () => {
  const images = new Set();
  let portrait;
  for (const { html } of pages.values()) {
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      assert.ok(attribute(tag, "alt"), "Meaningful image alternative");
      assert.ok(Number(attribute(tag, "width")) > 0);
      assert.ok(Number(attribute(tag, "height")) > 0);
      assert.ok(attribute(tag, "sizes"));
      if (attribute(tag, "alt") === "Rachit Garg, frontend and product engineer") portrait = tag;
      else assert.equal(attribute(tag, "loading"), "lazy");
      images.add(attribute(tag, "src"));
    }
  }
  assert.ok(portrait, "Homepage portrait is rendered");
  assert.equal(attribute(portrait, "loading"), "eager");
  assert.equal(attribute(portrait, "fetchPriority"), "high");
  assert.equal(images.size, 3);
  for (const path of images) {
    assert.ok(path.startsWith("/_next/image?"));
    const response = await request(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /image\//);
    await response.arrayBuffer();
  }
  for (const path of mediaFiles) {
    const response = await fetch(new URL(path, origin), { headers: { Range: "bytes=0-1023" }, signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 206, path);
    assert.match(response.headers.get("content-type"), /video\/mp4/);
    assert.match(response.headers.get("content-range"), /^bytes 0-1023\//);
    assert.equal((await response.arrayBuffer()).byteLength, 1024);
  }
});

test("homepage renders complete comparisons and experience before JavaScript", () => {
  const html = pages.get("/").html;
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  for (const value of ["3.6", "2.1", "78", "95", "82", "96", "40+", "Next.js + TypeScript", "Legacy components"]) assert.ok(text.includes(value), value);
  for (const value of ["Leviosa Consulting Pvt. Ltd.", "Junior Software Developer", "Jan 2025", "Present", "Intentive Technologies Pvt. Ltd.", "SDE Intern", "Aug 2024"]) assert.ok(text.includes(value), value);
  assert.match(html, /<time dateTime="2025-01"|<time datetime="2025-01"/);
  assert.match(html, /aria-labelledby="sringeri-diff-title"/);
  assert.doesNotMatch(html, /style="[^"]*(?:opacity:\s*0(?:;|")|visibility:\s*hidden)/);
  for (const route of routes.slice(1)) assert.doesNotMatch(pages.get(route).html, /class="sringeri-diff"/);
});

test("hero proof has a stable server default and four native controls", () => {
  const html = pages.get("/").html;
  const buttons = [...html.matchAll(/<button\b[^>]*class="proof-keyword"[^>]*>[\s\S]*?<\/button>/g)].map(([tag]) => tag);
  assert.equal(buttons.length, 4);
  for (const [index, label] of ["Performance", "Products", "Interfaces", "AI"].entries()) {
    assert.ok(buttons[index].includes(label));
    assert.equal(attribute(buttons[index], "type"), "button");
    assert.equal(attribute(buttons[index], "aria-pressed"), String(index === 0));
    assert.match(buttons[index], /\sdisabled(?:="")?/);
    assert.ok(html.includes(`id="${attribute(buttons[index], "aria-controls")}"`));
  }
  assert.match(html, /aria-live="polite" aria-atomic="true"/);
  assert.match(html, /id="hero-proof-0"[^>]*data-active="true"[^>]*aria-hidden="false"/);
  assert.doesNotMatch(html, /role="tab(?:list|panel)?"/);
});

test("GSAP is confined to the homepage's script graph", async () => {
  const cache = new Map();
  for (const [route, { html }] of pages) {
    const scripts = [...new Set([...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map((match) => match[1]))];
    let animationLoaded = false;
    for (const script of scripts) {
      if (!cache.has(script)) cache.set(script, await (await request(script)).text());
      if (/gsap\.com|gsap\.registerPlugin/.test(cache.get(script))) animationLoaded = true;
    }
    assert.equal(animationLoaded, route === "/", `${route}: animation runtime isolation`);
  }
});
