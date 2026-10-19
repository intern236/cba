#!/usr/bin/env bash
# Lighthouse against the static export served WITH compression (as a real host would).
# usage: tools/lh.sh <label> [paths...]
set -u
cd "$(dirname "$0")/.."
label=$1; shift
paths=${@:-"/"}
export CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
tools/node_modules/.bin/serve site/out -l 4174 --no-request-logging >/dev/null 2>&1 &
SPID=$!
sleep 2
mkdir -p reports/lighthouse
for p in $paths; do
  n=$(echo "$p" | tr -d '/'); n=${n:-home}
  for ff in mobile desktop; do
    extra=""; [ $ff = desktop ] && extra="--preset=desktop"
    timeout 180 tools/node_modules/.bin/lighthouse "http://127.0.0.1:4174$p" $extra --quiet \
      --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo \
      --output=json --output-path="reports/lighthouse/$label-$n-$ff.json" >/dev/null 2>&1
    python3 -I -c "
import json; r=json.load(open('reports/lighthouse/$label-$n-$ff.json')); c=r['categories']; a=r['audits']
print('$n $ff', {k:round(v['score']*100) for k,v in c.items()}, 'FCP',a['first-contentful-paint']['displayValue'],'LCP',a['largest-contentful-paint']['displayValue'],'TBT',a['total-blocking-time']['displayValue'],'CLS',a['cumulative-layout-shift']['displayValue'],'bytes',a['total-byte-weight']['displayValue'])"
  done
done
kill $SPID
