"""Turn the static export (out/) into a path-independent preview (preview/).

Next's export assumes it is served from a domain root (/_next/, /images/, /programs/).
For hosts where the site lives under an unknown sub-path (an artifact preview, a client's
staging folder), this rewrites the copy so it works from any base URL:

  * pages are flattened: programs/index.html -> programs.html (so every page shares one base)
  * root-absolute asset paths become relative (./_next/, ./images/, ./icon.svg)
  * internal route links become file links (/programs/ -> programs.html)
  * Turbopack's chunk base is set from the page URL at runtime
  * internal link clicks do a full page load instead of a client-side RSC fetch

The production build in out/ is untouched; deploy that to a real domain.
usage: python3 tools/make_preview.py out preview [--artifact]
"""
import os, re, shutil, sys

src, dst = sys.argv[1], sys.argv[2]
ROUTES = ["about", "contact", "facilities", "first-session", "gallery", "pathway", "programs"]

shutil.rmtree(dst, ignore_errors=True)
shutil.copytree(src, dst)

BOOT = (
    "<script>"
    "TURBOPACK_CHUNK_BASE_PATH='./_next/';"
    "document.addEventListener('click',function(e){"
    "var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;"
    "var h=a.getAttribute('href');"
    "if(!h||/^(https?:|mailto:|tel:|#|javascript:)/.test(h)||a.target==='_blank')return;"
    "if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;"
    "e.preventDefault();e.stopPropagation();location.href=h;},true);"
    # Client-side navigation is off, so RSC prefetches are pointless (and would 404).
    "var F=window.fetch;window.fetch=function(u,o){var s=String(u&&u.url||u);"
    "if(s.indexOf('_rsc=')>-1||/__next\\.[^/]*\\.txt/.test(s))return Promise.resolve(new Response('',{status:204}));"
    "return F.apply(this,arguments)};"
    "</script>"
)

ROUTE_JS = re.compile(r'"/(' + "|".join(ROUTES) + r')/(#[\w-]+)?"')
ROUTE_TPL = re.compile(r'(?<=[`"])/(' + "|".join(ROUTES) + r')/(?=#)')

route_alt = "|".join(ROUTES)


def rewrite(html: str) -> str:
    # Assets: any root-absolute reference preceded by a quote, space, comma, paren or escaped quote.
    html = re.sub(r'(?<=["\'\s,(])/(_next/|images/|icon\.svg)', r"./\1", html)
    # Route links, both in markup and in the escaped RSC payload.
    html = re.sub(r'(?<=["\'])/(' + route_alt + r')/(#[\w-]+)?(?=\\?["\'])',
                  lambda m: f"{m.group(1)}.html{m.group(2) or ''}", html)
    html = re.sub(r'(href=\\?")/(\\?")', r"\1index.html\2", html)
    html = re.sub(r'(\\"href\\":\\")/(\\")', r"\1index.html\2", html)
    html = html.replace("<head>", "<head>" + BOOT, 1)
    return html


pages = {"index.html": "index.html", "404.html": "404.html"}
for r in ROUTES:
    pages[f"{r}/index.html"] = f"{r}.html"

for srcp, outp in pages.items():
    with open(os.path.join(dst, srcp), encoding="utf-8") as f:
        html = f.read()
    with open(os.path.join(dst, outp), "w", encoding="utf-8") as f:
        f.write(rewrite(html))

# Drop the now-duplicated route folders and RSC payload files (not needed for full loads).
for r in ROUTES + ["_not-found", "404"]:
    shutil.rmtree(os.path.join(dst, r), ignore_errors=True)
for name in os.listdir(dst):
    if name.endswith(".txt") and name != "robots.txt":
        os.remove(os.path.join(dst, name))

css_dir = os.path.join(dst, "_next", "static", "chunks")

# Client bundles carry their own copies of route and image paths (nav list, hero photo).
# They must match the rewritten HTML, or React hydration sees a mismatch.
for name in os.listdir(css_dir):
    if name.endswith(".js"):
        p = os.path.join(css_dir, name)
        s = open(p, encoding="utf-8").read()
        s2 = ROUTE_JS.sub(lambda m: f'"{m.group(1)}.html{m.group(2) or ""}"', s)
        s2 = ROUTE_TPL.sub(lambda m: f"{m.group(1)}.html", s2)
        s2 = s2.replace('href:"/"', 'href:"index.html"')
        s2 = re.sub(r"(?<=[\"\s,`])/images/", "./images/", s2)
        if s2 != s:
            open(p, "w", encoding="utf-8").write(s2)

# CSS: make any root-absolute url() relative to the stylesheet.
for name in os.listdir(css_dir):
    if name.endswith(".css"):
        p = os.path.join(css_dir, name)
        s = open(p, encoding="utf-8").read()
        s2 = s.replace("url(/_next/static/", "url(../").replace("url(/images/", "url(../../../images/")
        if s2 != s:
            open(p, "w", encoding="utf-8").write(s2)

n = sum(len(fs) for _, _, fs in os.walk(dst))
print(f"preview: {n} files in {dst}")

# --artifact: extra steps for hosts that wrap the entry page and reserve "_" names
# (used for the claude.ai artifact preview). Entry index.html becomes a tiny launcher.
if "--artifact" in sys.argv:
    os.rename(os.path.join(dst, "index.html"), os.path.join(dst, "home.html"))
    os.rename(os.path.join(dst, "_next"), os.path.join(dst, "nx"))
    for root, _, fs in os.walk(dst):
        for f in fs:
            if f.endswith((".html", ".js", ".css")):
                p = os.path.join(root, f)
                s = open(p, encoding="utf-8").read()
                s2 = re.sub(r'(?<=["\'])index\.html(?=\\?["\'])', "home.html", s)
                s2 = s2.replace("_next/", "nx/").replace('"\ufffd"', '"\\ufffd"')
                if s2 != s:
                    open(p, "w", encoding="utf-8").write(s2)
    with open(os.path.join(dst, "index.html"), "w", encoding="utf-8") as f:
        f.write(open(os.path.join(os.path.dirname(__file__), "preview_launcher.html"), encoding="utf-8").read())
    print("artifact mode: launcher index.html -> home.html")
