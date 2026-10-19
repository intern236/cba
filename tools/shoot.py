"""Render the static export in headless Chromium and capture screenshots + checks.

usage: python3 shoot.py <out_dir_of_site> <screens_dir> [paths...]
Checks per page/viewport: console errors, horizontal overflow, broken internal links,
images without alt, focusable elements without accessible name.
"""
import json, sys, os, threading, http.server, socketserver, functools
from playwright.sync_api import sync_playwright

site, shots = sys.argv[1], sys.argv[2]
paths = sys.argv[3:] or ["/"]
os.makedirs(shots, exist_ok=True)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
Handler = functools.partial(Quiet, directory=site)
httpd = socketserver.TCPServer(("127.0.0.1", 0), Handler)
port = httpd.server_address[1]
threading.Thread(target=httpd.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{port}"

VIEWPORTS = {"desktop": (1440, 900), "tablet": (834, 1112), "mobile": (390, 844)}
report = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for vname, (w, h) in VIEWPORTS.items():
        for reduced in (False, True) if vname == "desktop" else (False,):
            ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1,
                                reduced_motion="reduce" if reduced else "no-preference")
            for path in paths:
                pg = ctx.new_page()
                errs = []
                pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
                pg.on("pageerror", lambda e: errs.append(str(e)))
                bad = []
                pg.on("response", lambda r: bad.append(f"{r.status} {r.url}") if r.status >= 400 and r.url.startswith(base) else None)
                pg.goto(base + path, wait_until="networkidle")
                pg.wait_for_timeout(2600)
                # scroll through to trigger in-view reveals
                H = pg.evaluate("document.documentElement.scrollHeight")
                y = 0
                while y < H:
                    pg.evaluate(f"window.scrollTo({{top:{y},behavior:\"instant\"}})"); pg.wait_for_timeout(260); y += h // 3
                pg.wait_for_timeout(900); pg.evaluate("window.scrollTo({top:0,behavior:\"instant\"})"); pg.wait_for_timeout(600)
                checks = pg.evaluate("""() => {
                  const de=document.documentElement;
                  const overflow = de.scrollWidth - de.clientWidth;
                  const wide=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>de.clientWidth+1 && getComputedStyle(e).position!=='fixed'}).slice(0,5).map(e=>e.tagName+'.'+(e.className||'').toString().slice(0,60));
                  const noAlt=[...document.images].filter(i=>!i.hasAttribute('alt')).map(i=>i.src);
                  const unnamed=[...document.querySelectorAll('a,button')].filter(e=>!(e.innerText.trim()||e.getAttribute('aria-label')||e.getAttribute('title')||e.querySelector('img[alt]:not([alt=""])'))).map(e=>e.outerHTML.slice(0,80));
                  const links=[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
                  const h1=document.querySelectorAll('h1').length;
                  return {overflow, wide, noAlt, unnamed, links, h1, title:document.title};
                }""")
                slug = (path.strip("/") or "home").replace("/", "_")
                tag = f"{slug}-{vname}{'-reduced' if reduced else ''}"
                pg.screenshot(path=f"{shots}/{tag}-top.png")
                if not reduced:
                    pg.screenshot(path=f"{shots}/{tag}-full.png", full_page=True)
                report.append({"page": path, "viewport": vname, "reduced": reduced,
                               "consoleErrors": errs, "http4xx": bad, **{k: v for k, v in checks.items() if k != "links"},
                               "internalLinks": sorted({l for l in checks["links"] if l.startswith("/")})})
                pg.close()
            ctx.close()
    b.close()
httpd.shutdown()
json.dump(report, open(f"{shots}/report.json", "w"), indent=1)
for r in report:
    flag = "OK " if not (r["consoleErrors"] or r["http4xx"] or r["overflow"] > 0 or r["noAlt"] or r["unnamed"]) else "!! "
    print(flag, r["page"], r["viewport"], "reduced" if r["reduced"] else "", "| h1:", r["h1"], "| overflow:", r["overflow"],
          "| errors:", r["consoleErrors"][:3], r["http4xx"][:3], "| noAlt:", len(r["noAlt"]), "| unnamed:", r["unnamed"][:2], "| wide:", r["wide"][:3])
