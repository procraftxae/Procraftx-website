#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ProCraftX rank tracker + competitor monitor (google.ae).

Tracks where procraftx.ae and its 5 competitors rank for a keyword list,
appends every run to a CSV history, and reports movement since the last run.

WHY AN API KEY IS REQUIRED
--------------------------
Google blocks automated queries to google.com/search. Scraping it gets you
CAPTCHAs and eventually an IP block, and it violates their ToS. This script
uses a SERP API instead. Serper.dev gives 2,500 free queries on signup,
which covers ~50 keywords weekly for a year.

SETUP
-----
  pip install requests
  set SERPER_API_KEY=your_key_here        (Windows CMD)
  $env:SERPER_API_KEY="your_key_here"     (PowerShell)

USAGE
-----
  python rank_tracker.py                     # track keywords.txt
  python rank_tracker.py --file mykw.txt     # custom keyword file
  python rank_tracker.py --report            # show movement, no new queries
  python rank_tracker.py --top 3             # only alert on top-3 changes

Keyword file: one keyword per line, blank lines and # comments ignored.
If keywords.txt is missing, the script writes a starter list from the
verified priority keywords and exits so you can edit it.
"""

import os, sys, csv, json, time, argparse, datetime, urllib.request, urllib.error

MY_DOMAIN = "procraftx.ae"
COMPETITORS = [
    "mplus.ae",
    "wewillfixit.com",
    "fixperts.ae",
    "breathemaintenance.com",
    "handyman-dubai.com",
]
ALL_DOMAINS = [MY_DOMAIN] + COMPETITORS

HISTORY = "rank_history.csv"
KEYWORDS_DEFAULT = "keywords.txt"

# Verified priority keywords from the autocomplete harvest.
STARTER = """# ProCraftX priority keywords - edit freely, one per line.
# Price cluster - highest frequency, no competitor owns these
ac service cost in dubai
deep cleaning dubai price
painting price in dubai
movers and packers dubai cost
ac maintenance dubai price
# Sharjah - zero competitor coverage
ac repair sharjah
ac service sharjah
cleaning services sharjah
plumber sharjah
electrician sharjah near me
# Differentiated services
car parking shades dubai
furniture restoration dubai
antique furniture restoration dubai
sofa repair dubai
shower glass partition dubai
villa maintenance contract dubai
# Head terms - long horizon, track for trend only
handyman services dubai
ac repair dubai near me
plumbing services dubai
home maintenance dubai
maintenance companies in dubai
"""


def die(msg, code=1):
    print("ERROR: " + msg, file=sys.stderr)
    sys.exit(code)


def load_keywords(path):
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            f.write(STARTER)
        print("Created %s with %d starter keywords." % (
            path, len([l for l in STARTER.splitlines()
                       if l.strip() and not l.startswith("#")])))
        print("Edit it if you like, then run again.")
        sys.exit(0)
    out = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                out.append(line.lower())
    return out


def serp(keyword, api_key):
    """Query google.ae via Serper.dev. Returns list of result URLs in order."""
    payload = json.dumps({
        "q": keyword,
        "gl": "ae",          # country: United Arab Emirates
        "hl": "en",
        "location": "Dubai, United Arab Emirates",
        "num": 100,
    }).encode()
    req = urllib.request.Request(
        "https://google.serper.dev/search",
        data=payload,
        headers={"X-API-KEY": api_key, "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:200]
        print("  ! HTTP %s for %r: %s" % (e.code, keyword, body))
        return None
    except Exception as e:
        print("  ! %r: %s" % (keyword, e))
        return None
    return [item.get("link", "") for item in data.get("organic", [])]


def position_of(domain, links):
    """1-indexed organic position of the first URL on `domain`, else None."""
    for i, link in enumerate(links, 1):
        host = link.split("//")[-1].split("/")[0].lower()
        if host.startswith("www."):
            host = host[4:]
        if host == domain or host.endswith("." + domain):
            return i
    return None


def read_history():
    if not os.path.exists(HISTORY):
        return []
    with open(HISTORY, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def append_history(rows):
    exists = os.path.exists(HISTORY)
    fields = ["date", "keyword", "domain", "position"]
    with open(HISTORY, "a", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        if not exists:
            w.writeheader()
        w.writerows(rows)


def fmt(p):
    return "-" if p in (None, "", "None") else str(p)


def report(top_n=None):
    hist = read_history()
    if not hist:
        die("No history yet. Run without --report first.")
    dates = sorted({r["date"] for r in hist})
    if len(dates) < 2:
        print("Only one run recorded (%s). Need two runs to show movement.\n" % dates[0])
    latest, prev = dates[-1], (dates[-2] if len(dates) > 1 else None)

    def snap(d):
        return {(r["keyword"], r["domain"]): r["position"] for r in hist if r["date"] == d}

    now, before = snap(latest), (snap(prev) if prev else {})
    keywords = sorted({r["keyword"] for r in hist if r["date"] == latest})

    print("\n" + "=" * 78)
    print("RANK REPORT   %s" % latest + ("   (vs %s)" % prev if prev else ""))
    print("=" * 78)
    hdr = "%-38s %-7s" % ("KEYWORD", "YOU")
    for c in COMPETITORS:
        hdr += " %-7s" % c.split(".")[0][:6]
    print(hdr)
    print("-" * 78)

    wins, losses, unranked = [], [], []
    for kw in keywords:
        mine = now.get((kw, MY_DOMAIN))
        old = before.get((kw, MY_DOMAIN))
        mi = int(mine) if mine not in (None, "", "None") else None
        oi = int(old) if old not in (None, "", "None") else None

        delta = ""
        if mi and oi:
            d = oi - mi
            if d > 0:
                delta = " +%d" % d; wins.append((kw, oi, mi))
            elif d < 0:
                delta = " %d" % d;  losses.append((kw, oi, mi))
        elif mi and not oi and prev:
            delta = " NEW"; wins.append((kw, None, mi))
        elif oi and not mi:
            delta = " LOST"; losses.append((kw, oi, None))

        if mi is None:
            unranked.append(kw)

        row = "%-38s %-7s" % (kw[:38], fmt(mine) + delta)
        for c in COMPETITORS:
            row += " %-7s" % fmt(now.get((kw, c)))
        print(row)

    print("-" * 78)
    if wins:
        print("\nIMPROVED (%d):" % len(wins))
        for kw, o, n in wins[:15]:
            print("   %-42s %s -> %s" % (kw[:42], fmt(o), fmt(n)))
    if losses:
        print("\nDECLINED (%d):" % len(losses))
        for kw, o, n in losses[:15]:
            print("   %-42s %s -> %s" % (kw[:42], fmt(o), fmt(n)))
    if unranked:
        print("\nNOT IN TOP 100 (%d): %s" % (len(unranked), ", ".join(unranked[:12])))

    # Competitor share of top N
    n = top_n or 10
    print("\nSHARE OF TOP %d ACROSS %d TRACKED KEYWORDS" % (n, len(keywords)))
    for d in ALL_DOMAINS:
        c = sum(1 for kw in keywords
                if (now.get((kw, d)) not in (None, "", "None"))
                and int(now[(kw, d)]) <= n)
        bar = "#" * c
        tag = "  <-- YOU" if d == MY_DOMAIN else ""
        print("   %-26s %2d  %s%s" % (d, c, bar, tag))
    print()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", default=KEYWORDS_DEFAULT)
    ap.add_argument("--report", action="store_true", help="show movement, no API calls")
    ap.add_argument("--top", type=int, default=10)
    args = ap.parse_args()

    if args.report:
        report(args.top)
        return

    # Create the starter keyword file first, so a first run is useful even
    # before an API key exists.
    keywords = load_keywords(args.file)

    api_key = os.environ.get("SERPER_API_KEY")
    if not api_key:
        die("SERPER_API_KEY not set.\n"
            "  Get a free key at https://serper.dev (2,500 free queries)\n"
            '  PowerShell:  $env:SERPER_API_KEY="your_key"\n'
            "  Then re-run. Or use --report to view existing history.")
    today = datetime.date.today().isoformat()
    print("Tracking %d keywords on google.ae (Dubai)...\n" % len(keywords))

    rows, failed = [], 0
    for i, kw in enumerate(keywords, 1):
        links = serp(kw, api_key)
        if links is None:
            failed += 1
            continue
        mine = position_of(MY_DOMAIN, links)
        line = "[%2d/%d] %-40s you=%-4s" % (i, len(keywords), kw[:40], fmt(mine))
        for d in ALL_DOMAINS:
            rows.append({"date": today, "keyword": kw,
                         "domain": d, "position": position_of(d, links)})
        best = [(position_of(c, links), c) for c in COMPETITORS]
        best = sorted([b for b in best if b[0]])
        if best:
            line += " | top competitor: %s #%d" % (best[0][1], best[0][0])
        print(line)
        time.sleep(1.1)          # stay well inside rate limits

    if not rows:
        die("No results collected. Check your API key and network.")
    append_history(rows)
    print("\nSaved %d rows to %s.%s" % (
        len(rows), HISTORY, "  (%d keywords failed)" % failed if failed else ""))
    report(args.top)


if __name__ == "__main__":
    main()
