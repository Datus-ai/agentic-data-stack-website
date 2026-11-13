"""SVG graphics for the site. All strokes are centre-line (animatable); colours come from CSS classes."""
import math, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.join(HERE, 'brand')

def _f(v): return ('%.1f' % v).rstrip('0').rstrip('.')

# ---------- logo
def logo_mark(cls='brand-mark', size=28):
    d = json.load(open(os.path.join(BRAND, 'brand_v1.json'), encoding='utf-8'))['svg']['mark']
    paths = re.findall(r'<path d="([^"]+)" fill="(#[0-9A-Fa-f]{6})"', d)
    body = ''.join(f'<path d="{p}" class="{"mk-node" if c.upper() == "#FE00FE" else "mk-stream"}"/>' for p, c in paths)
    return f'<svg class="{cls}" width="{size}" height="{size}" viewBox="8 8 104 104" aria-hidden="true" focusable="false">{body}</svg>'

_S = 'stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="round" fill="none"'
EXTRA_ICONS = {  # same grid and stroke as the brand set
    # architecture diagram (2026-11-12): drawn to the same 24 grid, 1.5 stroke, butt caps
    'chart': f'<path d="M4 20H20M7.5 20V12.5M12 20V5.5M16.5 20V9.5" {_S}/>',
    'tag': f'<path d="M4.25 4.25H11.5L20 12.75L12.75 20L4.25 11.5Z" {_S}/><circle cx="8.25" cy="8.25" r="1.25" {_S}/>',
    'eye': f'<path d="M2.75 12C5.25 7.75 8.4 5.75 12 5.75S18.75 7.75 21.25 12C18.75 16.25 15.6 18.25 12 18.25S5.25 16.25 2.75 12Z" {_S}/><circle cx="12" cy="12" r="2.75" {_S}/>',
    'chip': f'<rect x="7.25" y="7.25" width="9.5" height="9.5" rx="1.5" {_S}/><path d="M10 3.5V7.25M14 3.5V7.25M10 16.75V20.5M14 16.75V20.5M3.5 10H7.25M3.5 14H7.25M16.75 10H20.5M16.75 14H20.5" {_S}/>',
    'box': f'<path d="M12 3.5L19.75 7.75V16.25L12 20.5L4.25 16.25V7.75Z" {_S}/><path d="M4.25 7.75L12 12L19.75 7.75M12 12V20.5" {_S}/>',
    'waves': f'<path d="M3 8.25C5 6.25 7 6.25 9 8.25S13 10.25 15 8.25S19 6.25 21 8.25M3 13.25C5 11.25 7 11.25 9 13.25S13 15.25 15 13.25S19 11.25 21 13.25M3 18.25C5 16.25 7 16.25 9 18.25S13 20.25 15 18.25S19 16.25 21 18.25" {_S}/>',
    'loop': f'<path d="M4.5 11A7.75 7.75 0 0 1 18.25 7M19.5 3.75V7.5H15.75M19.5 13A7.75 7.75 0 0 1 5.75 17M4.5 20.25V16.5H8.25" {_S}/>',
    'search': f'<circle cx="10.75" cy="10.75" r="6.25" {_S}/><path d="M15.25 15.25L20.25 20.25" {_S}/>',
    'blocks': f'<rect x="4.25" y="4.25" width="6.5" height="6.5" rx="1" {_S}/><rect x="13.25" y="4.25" width="6.5" height="6.5" rx="1" {_S}/><rect x="4.25" y="13.25" width="6.5" height="6.5" rx="1" {_S}/><path d="M16.5 13.5V19.5M13.5 16.5H19.5" {_S}/>',
    'graph': f'<circle cx="6" cy="6.5" r="2.5" {_S}/><circle cx="18" cy="9" r="2.5" {_S}/><circle cx="9.5" cy="18" r="2.5" {_S}/><path d="M8.45 7.01L15.55 8.49M7.02 8.78L8.78 15.6M16.2 10.74L11.3 16.26" {_S}/>',
}
def icon(name, size=20, cls='icon'):
    if name in EXTRA_ICONS: inner = EXTRA_ICONS[name]
    else:
        s = open(os.path.join(BRAND, 'icons', f'ads-icon-{name}.svg'), encoding='utf-8').read()
        inner = re.sub(r'^<svg[^>]*>|</svg>$', '', s.strip())
    return f'<svg class="{cls}" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">{inner}</svg>'

# ---------- hero diagram: infrastructure streams -> context band -> data agent node
def hero_diagram(lang='zh'):
    W, H, Y0 = 600, 416, 36                 # viewBox starts at the column heads: the caption row and the footer row are gone
    ys = [140, 215, 290, 365]; cx, cy, R, gap = 492, 252.5, 34, 11; x1 = 212; spread = 50
    names = ['CATALOG', 'LAKEHOUSE', 'ENGINE', 'PIPELINE']
    ctx = ['SEMANTICS', 'KNOWLEDGE', 'METADATA']
    o = []
    o.append(f'<svg class="hero-diagram" viewBox="0 {Y0} {W} {H}" role="img" aria-labelledby="hd-title hd-desc">')
    o.append('<title id="hd-title">A new kind of data stack</title>')
    o.append('<desc id="hd-desc">Infrastructure (catalog, lakehouse, engine, pipeline) flows through context (semantics, knowledge, metadata) into the data agent, and the agent acts back on the infrastructure.</desc>')
    # column heads
    o.append('<g class="hd-head"><text x="0" y="58">INFRASTRUCTURE</text><text x="228" y="58">CONTEXT</text><text x="428" y="58">DATA AGENT</text></g>')
    # context band
    o.append(f'<rect class="hd-band" x="{x1}" y="76" width="188" height="366" rx="14"/>')
    # streams
    n = len(ys)
    for i, y in enumerate(ys):
        a = math.radians(180 + spread - 2 * spread * i / (n - 1)); dx, dy = math.cos(a), math.sin(a)
        ex, ey = cx + (R + gap) * dx, cy + (R + gap) * dy
        L = math.hypot(ex - x1, ey - y)
        d = f'M0 {y}H{x1}C{_f(x1 + L * .5)} {y} {_f(ex + dx * L * .42)} {_f(ey + dy * L * .42)} {_f(ex)} {_f(ey)}'
        # one group per stream: wide invisible hit area (hover), the stream, the travelling packet, the label
        o.append(f'<g class="hd-row" style="--i:{i}"><path class="hd-hit" fill="none" d="{d}"/><path class="hd-stream" pathLength="1" d="{d}"/><path class="hd-pulse" pathLength="1" d="{d}"/><text class="hd-label" x="0" y="{y - 13}">{names[i]}</text></g>')
    for j, t in enumerate(ctx):
        o.append(f'<text class="hd-label hd-ctx" style="--j:{j}" x="{x1 + 16}" y="{(ys[j] + ys[j + 1]) / 2 + 4}">{t}</text>')
    # feedback path (agent acts back on the stack)
    o.append(f'<path class="hd-back" d="M{cx} {cy + R + 12}C{cx} 400 {cx - 70} 432 {cx - 150} 432H30"/>')
    o.append('<path class="hd-back-head" d="M38 426L30 432L38 438"/>')
    # node
    o.append(f'<circle class="hd-ripple" fill="none" cx="{cx}" cy="{cy}" r="{R + 14}"/>')
    o.append(f'<circle class="hd-ring" cx="{cx}" cy="{cy}" r="{R + 14}"/>')
    o.append(f'<circle class="hd-node" cx="{cx}" cy="{cy}" r="{R}"/>')
    o.append('</svg>')
    return ''.join(o)

# ---------- skyline + rails strip for the Hangzhou meetup (one rail per talk)
def _agenda_times():
    from event_data import AGENDA, EVENT
    talks = [a['time'][:5] for a in AGENDA if a['kind'] != 'break']; brk = [a['time'][:5] for a in AGENDA if a['kind'] == 'break']
    return tuple(talks[:3]), tuple(talks[3:6]), brk[0], EVENT['time'][-5:]
def skyline(times_left=None, times_right=None, mid=None, end=None, W=1440, H=330, G=196, cls='skyline'):
    tl, tr, tm, te = _agenda_times()
    times_left = times_left or tl; times_right = times_right or tr; mid = mid or tm; end = end or te
    P = lambda d, c='sk': f'<path class="{c}" d="{d}"/>'
    o = [f'<svg class="{cls}" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">']
    o.append(P(f'M0 {G}H{W}'))
    o.append(P(f'M0 {G}C40 {G-30} 90 {G-42} 140 {G-34}C180 {G-56} 232 {G-58} 272 {G-30}C300 {G-40} 330 {G-36} 352 {G-18}'))
    o.append(P(f'M178 {G-52}V{G-112}M174 {G-70}H182M174 {G-86}H182M174 {G-100}H182M178 {G-112}V{G-124}'))
    o.append(P(f'M352 {G}Q418 {G-38} 484 {G}') + P(f'M374 {G}Q418 {G-20} 462 {G}'))
    for x0, w in [(300, 34), (500, 46), (380, 26), (700, 30)]: o.append(P(f'M{x0} {G+10}H{x0+w}'))
    # pagoda
    cx, y = 590, G; o.append(P(f'M{cx-46} {y}H{cx+46}'))
    for w, h in [(80, 12), (64, 18), (52, 16), (40, 15), (28, 13)]:
        top = y - h; o.append(P(f'M{cx-w/2} {y}V{top}M{cx+w/2} {y}V{top}')); ew = w / 2 + 12
        o.append(P(f'M{cx-ew} {top+3}Q{cx} {top-7} {cx+ew} {top+3}')); y = top - 3
    o.append(P(f'M{cx} {y}V{y-18}M{cx-4} {y-9}H{cx+4}'))
    o.append(P(f'M686 {G}V{G-34}M686 {G-34}C676 {G-30} 672 {G-18} 674 {G-6}M686 {G-34}C696 {G-30} 700 {G-18} 698 {G-6}M686 {G-28}C680 {G-20} 680 {G-10} 682 {G-2}'))
    for x, w, h in [(770, 40, 70), (818, 30, 108), (940, 34, 124), (984, 26, 86), (1040, 36, 98)]:
        o.append(P(f'M{x} {G}V{G-h}H{x+w}V{G}') + P(f'M{x+w/2} {G-h+12}V{G-12}'))
    o.append(P(f'M864 {G}V{G-40}H906V{G}') + f'<circle class="sk" cx="885" cy="{G-66}" r="26"/>' + P(f'M865 {G-66}H905'))
    vx, vw, vh = 1150, 46, 160
    o.append(P(f'M{vx} {G}V{G-vh}H{vx+vw}V{G}') + P(f'M{vx+vw/2} {G-vh}V{G-vh-16}'))
    for k in range(1, 6): o.append(P(f'M{vx+6} {G-vh+k*26}H{vx+vw-6}'))
    f22 = G - 22 * vh / 30
    o.append(P(f'M{vx+vw} {_f(f22)}H{vx+vw+18}'))
    for x, w, h in [(1222, 30, 92), (1266, 42, 62), (1324, 28, 116), (1366, 40, 74)]: o.append(P(f'M{x} {G}V{G-h}H{x+w}V{G}'))
    # rails: n talks, merge at the tea break, split, merge again at the venue
    n = len(times_left) + len(times_right); yc = G + 70; sp, bd = 12, 4
    x_in, x_out, x_end = 330, 470, vx + vw / 2
    for i in range(n):
        off, b = (i - (n - 1) / 2) * sp, (i - (n - 1) / 2) * bd; d1 = abs(off - b); y0, yb = yc + off, yc + b
        o.append(P(f'M0 {_f(y0)}H{_f(x_in-d1)}L{x_in} {_f(yb)}H{x_out}L{_f(x_out+d1)} {_f(y0)}H{_f(x_end-80-d1)}L{x_end-80} {_f(yb)}H{x_end}', 'rail'))
    capH = (n - 1) * bd + 20
    for kk, x in ((3, 400), (7, x_end)): o.append(f'<rect class="stn" style="--k:{kk}" x="{x-11}" y="{_f(yc-capH/2)}" width="22" height="{capH}" rx="11"/>')
    xs_l = [90, 170, 250]; xs_r = [600, 760, 920]
    # stations sit on the outer rails only (alternating), so a time label never crosses another rail
    for k, (x, tm) in enumerate(list(zip(xs_l, times_left)) + list(zip(xs_r, times_right))):
        top = k % 2 == 0; y = yc + ((0 if top else n - 1) - (n - 1) / 2) * sp
        o.append(f'<circle class="stn" style="--k:{k if k < 3 else k + 1}" cx="{x}" cy="{_f(y)}" r="4.5"/>')
        o.append(f'<text class="sk-time" x="{x}" y="{_f(y - 13 if top else y + 23)}" text-anchor="middle">{tm}</text>')
    o.append(f'<text class="sk-time" x="400" y="{_f(yc+capH/2+20)}" text-anchor="middle">{mid}</text>')
    o.append(f'<text class="sk-time" x="{x_end}" y="{_f(yc+capH/2+20)}" text-anchor="middle">{end}</text>')
    o.append(f'<circle class="sk-ripple" fill="none" cx="{vx+vw+28}" cy="{_f(f22)}" r="9"/><circle class="sk-node" cx="{vx+vw+28}" cy="{_f(f22)}" r="9"/>')
    o.append('</svg>')
    return ''.join(o)

# ---------- small rail divider: three lines merging into a node (footer / section ornament)
def rail_divider(W=1200, cls='rail-divider'):
    y = 20; sp, bd = 10, 3.5; xa = W - 190; o = [f'<svg class="{cls}" viewBox="0 0 {W} 40" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">']
    for i in (-1, 0, 1):
        d1 = abs(i * sp - i * bd)
        o.append(f'<path class="rail" d="M0 {y+i*sp}H{_f(xa-d1)}L{xa} {_f(y+i*bd)}H{W-70}"/>')
    o.append(f'<rect class="stn" x="{W-92}" y="{y-13}" width="22" height="26" rx="11"/>')
    o.append(f'<path class="rail" d="M{W-70} {y}H{W-34}"/><circle class="sk-node" cx="{W-22}" cy="{y}" r="9"/></svg>')
    return ''.join(o)

# ---------- inner-page hero ornament: three rails with stations merging into one node
def hero_art(cls='page-hero-art'):
    W, H = 520, 220; cy = 150; xm = 392; o = [f'<svg class="{cls}" viewBox="0 0 {W} {H}" aria-hidden="true" focusable="false">']
    ys = [36, 150, 198]; offs = [-7, 0, 7]
    for y, off in zip(ys, offs):
        o.append(f'<path class="rail" d="M0 {y}H150C{_f(150 + 130)} {y} {_f(xm - 120)} {cy + off} {xm} {cy + off}H{xm + 22}"/>')
    for k, (x, y) in enumerate([(30, 198), (52, 36), (86, 150), (118, 36), (132, 198)]):
        o.append(f'<circle class="stn" style="--k:{k}" cx="{x}" cy="{y}" r="4.5"/>')
    o.append(f'<rect class="stn" x="{xm + 8}" y="{cy - 18}" width="22" height="36" rx="11"/>')
    o.append(f'<path class="rail" d="M{xm + 30} {cy}H{W - 46}"/><circle class="sk-node" cx="{W - 34}" cy="{cy}" r="10"/></svg>')
    return ''.join(o)

ARROWS = {'→': ('e', 'M2.5 8H13M8.5 3.5L13 8L8.5 12.5'), '↗': ('ne', 'M4 12L12 4M5.5 4H12V10.5'), '↓': ('s', 'M8 2.5V13M3.5 8.5L8 13L12.5 8.5'), '←': ('w', 'M13.5 8H3M7.5 3.5L3 8L7.5 12.5')}
def arrow(ch):
    k, d = ARROWS[ch]
    return f'<svg class="arr arr-{k}" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="{d}"/></svg>'

# ---------- converging streams (generic, n lines) for materials / og
def converge(n=6, W=1600, H=480, cx=1440, cy=240, R=40, x1=640, spread=46, gap=18, top=40, bot=440, cls='kv'):
    o = [f'<svg class="{cls}" viewBox="0 0 {W} {H}" aria-hidden="true" focusable="false">']
    for i in range(n):
        y = top + (bot - top) * i / (n - 1); a = math.radians(180 + spread - 2 * spread * i / (n - 1)); dx, dy = math.cos(a), math.sin(a)
        ex, ey = cx + (R + gap) * dx, cy + (R + gap) * dy; L = math.hypot(ex - x1, ey - y)
        o.append(f'<path class="hd-stream" style="--i:{i}" pathLength="1" d="M0 {_f(y)}H{x1}C{_f(x1+L*.55)} {_f(y)} {_f(ex+dx*L*.3)} {_f(ey+dy*L*.3)} {_f(ex)} {_f(ey)}"/>')
    o.append(f'<circle class="hd-node" cx="{cx}" cy="{cy}" r="{R}"/></svg>')
    return ''.join(o)

# ---------- Hangzhou landmark: Leifeng-style pagoda by West Lake with a "Three Pools" stone lantern. Sits at the lower right of 「杭州站」.
def landmark(cls='lm', sw=2.6, style='', signal='var(--signal)', tint='var(--tint)'):
    """viewBox 132 x 150, ground line at y=136 (ripples hang below it). Roofs are solid, walls are line: reads next to heavy type.
       All paint is set as attributes so the Figma importer keeps it; colours come from currentColor / the signal + tint variables."""
    cx, g = 54, 136; S = f'fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"'
    o = [f'<svg class="{cls}" viewBox="0 0 132 150" style="{style}" aria-hidden="true" focusable="false">']
    o.append(f'<path {S} d="M5 {g}H127"/>')
    o.append(f'<path {S} d="M{cx-31} {g}V{g-6}H{cx+31}V{g}"/>')
    y = g - 6
    tiers = [(23, 17), (19, 16), (15.5, 15), (12, 14), (8.5, 13)]
    for i, (bw, h) in enumerate(tiers):
        top = y - h
        o.append(f'<path {S} d="M{_f(cx-bw)} {_f(y)}V{_f(top)}M{_f(cx+bw)} {_f(y)}V{_f(top)}"/>')
        if i == 0: o.append(f'<path {S} d="M{cx-5} {_f(y)}V{_f(y-8)}Q{cx} {_f(y-14)} {cx+5} {_f(y-8)}V{_f(y)}"/>')
        else: o.append(f'<path {S} d="M{cx} {_f(top+4.5)}V{_f(y-3.5)}"/>')
        ov = 10 - i * .8; e = top                     # eave: solid sliver with upturned tips
        if i < len(tiers) - 1:
            ba = tiers[i + 1][0]
            o.append(f'<path fill="currentColor" stroke="currentColor" stroke-width="{sw * .5:.1f}" stroke-linejoin="round" d="M{_f(cx-bw-ov)} {_f(e-2.6)}Q{_f(cx-bw-2)} {_f(e+1.6)} {_f(cx-bw+3)} {_f(e)}H{_f(cx+bw-3)}Q{_f(cx+bw+2)} {_f(e+1.6)} {_f(cx+bw+ov)} {_f(e-2.6)}Q{_f(cx+bw)} {_f(e-2.4)} {_f(cx+ba)} {_f(e-5)}H{_f(cx-ba)}Q{_f(cx-bw)} {_f(e-2.4)} {_f(cx-bw-ov)} {_f(e-2.6)}Z"/>')
            y = e - 5
        else:
            o.append(f'<path fill="currentColor" stroke="currentColor" stroke-width="{sw * .5:.1f}" stroke-linejoin="round" d="M{_f(cx-bw-ov)} {_f(e-2.6)}Q{_f(cx-bw-2)} {_f(e+1.6)} {_f(cx-bw+3)} {_f(e)}H{_f(cx+bw-3)}Q{_f(cx+bw+2)} {_f(e+1.6)} {_f(cx+bw+ov)} {_f(e-2.6)}Q{cx+4} {_f(e-4.5)} {cx+1.6} {_f(e-12)}H{cx-1.6}Q{cx-4} {_f(e-4.5)} {_f(cx-bw-ov)} {_f(e-2.6)}Z"/>')
            o.append(f'<path {S} d="M{cx} {_f(e-12)}V{_f(e-26)}M{cx-4} {_f(e-17)}H{cx+4}M{cx-2.8} {_f(e-21.5)}H{cx+2.8}"/>')
            o.append(f'<circle fill="{signal}" cx="{cx}" cy="{_f(e-30)}" r="3.4"/>')
    lx = 106                                          # stone lantern standing in the lake
    o.append(f'<path {S} d="M{lx} {g}V{g-7}M{lx-5.5} {g-7}H{lx+5.5}M{lx-3} {g-7}V{g-10}M{lx+3} {g-7}V{g-10}"/>')
    o.append(f'<circle {S} cx="{lx}" cy="{g-16.5}" r="6.5"/><circle fill="currentColor" cx="{lx}" cy="{g-16.5}" r="2"/>')
    o.append(f'<path {S} d="M{lx-8} {g-24.5}Q{lx} {g-30.5} {lx+8} {g-24.5}M{lx} {g-28.5}V{g-34}"/>')
    T = f'fill="none" stroke="{tint}" stroke-width="{sw * .85:.1f}" stroke-linecap="round"'
    o.append(f'<path {T} d="M84 {g+6}H112M98 {g+11.5}H127M14 {g+6}H30"/>')
    o.append('</svg>')
    return ''.join(o)

if __name__ == '__main__':
    print(len(logo_mark()), len(hero_diagram()), len(skyline()), len(rail_divider()), len(icon('calendar')))
