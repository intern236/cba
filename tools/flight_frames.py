"""Capture the hero flight as a frame strip at a given viewport. usage: flight_frames.py <out_dir> <shots_dir> <w> <h>"""
import sys, os, threading, http.server, socketserver, functools
from playwright.sync_api import sync_playwright
from PIL import Image

site, shots, W, H = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
os.makedirs(shots, exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
Handler = functools.partial(Quiet, directory=site)
httpd = socketserver.TCPServer(("127.0.0.1", 0), Handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
url = f"http://127.0.0.1:{httpd.server_address[1]}/"
times = [500, 900, 1150, 1400, 1700, 2000, 2400, 2800, 3300, 4200]
frames = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": W, "height": H})
    errs = []
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(url, wait_until="domcontentloaded")
    pg.wait_for_load_state("networkidle")
    t0 = 0
    start = pg.evaluate("performance.now()")
    for t in times:
        now = pg.evaluate("performance.now()") - start
        if t > now:
            pg.wait_for_timeout(t - now)
        f = f"{shots}/f{W}_{t}.png"
        pg.screenshot(path=f)
        frames.append(f)
    print("errors:", errs)
    b.close()
httpd.shutdown()
ims = [Image.open(f).convert("RGB") for f in frames]
tw = 640 if W > 800 else 300
ims = [i.resize((tw, int(i.height * tw / i.width))) for i in ims]
cols = 2
rows = (len(ims) + 1) // 2
sheet = Image.new("RGB", (tw * cols + 10, rows * (ims[0].height + 10)), "white")
for k, im in enumerate(ims):
    sheet.paste(im, ((k % cols) * (tw + 10), (k // cols) * (im.height + 10)))
sheet.save(f"{shots}/flight_{W}.jpg", quality=80)
print(f"{shots}/flight_{W}.jpg")
