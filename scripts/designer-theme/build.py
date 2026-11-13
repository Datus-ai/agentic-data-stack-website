#!/usr/bin/env python3
"""Build the re-skinned static site from the exported prototype.
   - 'community' pages (all zh pages + en home/events/event/cfp/about): the prototype's own <main> markup is kept and re-styled.
   - older-layout English pages (resources, blog, newsletter): content is extracted and re-rendered with the same components.
   Usage: python3 build.py   ->  ../site/"""
import os, re, shutil, json, html, sys
import dom
from dom import Raw, Node
import graphics as G
from event_data import EVENT, AGENDA, TALKS

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', '..', '.designer-source')
OUT = os.path.join(HERE, '..', '..', 'out')
E = lambda s: html.escape(str(s), quote=True)
ARROW = {'→': 'arrow', '↗': 'external'}

# ------------------------------------------------------------------ helpers
def loc_of(rel): return 'zh' if rel == 'zh.html' or rel.startswith('zh/') else 'en'
def strip_loc(rel): return rel[3:] if rel.startswith('zh/') else ('index.html' if rel == 'zh.html' else rel)
def kind_of(rel):
    r = strip_loc(rel)[:-5]
    if r == 'index': return 'home'
    if r in ('events', 'cfp', 'about', 'resources', 'blog', 'newsletter'): return r
    if r == 'events/hangzhou/2026': return 'event'
    if r.startswith('resources/'): return 'tool' if r.count('/') == 2 else 'category'
    if r.startswith('blog/'): return 'post'
    if r.startswith('newsletter/'): return 'issue'
    return 'stub'
def section_of(rel):
    r = strip_loc(rel)
    for k in ('events', 'blog', 'resources', 'about', 'cfp', 'newsletter'):
        if r == k + '.html' or r.startswith(k + '/'): return k
    return 'home'
def counterpart(rel):
    other = strip_loc(rel) if loc_of(rel) == 'zh' else ('zh.html' if rel == 'index.html' else 'zh/' + rel)
    if os.path.exists(os.path.join(SRC, other)):
        return '/' + ('' if other == 'index.html' else other[:-5])
    return '/zh' if loc_of(rel) == 'en' else '/'
def texts(node):
    out = []
    def walk(n):
        for c in n.children:
            if isinstance(c, str):
                t = re.sub(r'\s+', ' ', c).strip()
                if t: out.append(t)
            elif c.tag not in ('script', 'style', 'svg', 'noscript', 'template'): walk(c)
    walk(node); return out
def head_meta(raw):
    head = raw[:raw.find('</head>')] if '</head>' in raw else raw[:6000]
    title = re.search(r'<title>(.*?)</title>', head, re.S)
    keep = []
    for m in re.finditer(r'<(meta|link)\b[^>]*>', head):
        t = m.group(0)
        if re.search(r'name="(description|robots|keywords|author|twitter:[^"]+)"|property="og:[^"]+"|rel="(canonical|alternate)"', t):
            keep.append(t if t.endswith('/>') else t[:-1] + '/>')
    keep.extend(re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>.*?</script>', head, re.S))
    return (html.unescape(title.group(1)) if title else 'Agentic Data Stack'), keep
def arrowize(node):
    """Trailing arrow glyphs inside buttons / links become spans so CSS can animate them."""
    for a in node.find_all(pred=lambda n: n.tag in ('a', 'button') or (n.tag == 'span' and n.has('text-link'))):
        new = []
        for c in a.children:
            if isinstance(c, str) and not isinstance(c, Raw):
                m = re.match(r'^(.*?)\s*([→↗↓←])\s*$', c, re.S)
                if m and m.group(1).strip():
                    new += [m.group(1).rstrip(), Raw(f'<span class="arr" aria-hidden="true">{m.group(2)}</span>')]; continue
                if c.strip() in ('→', '↗', '↓', '←'):
                    new.append(Raw(f'<span class="arr" aria-hidden="true">{c.strip()}</span>')); continue
            elif isinstance(c, Node) and c.tag == 'span' and c.t() in ('→', '↗', '↓', '←') and not c.cls:
                c.attrs['class'] = 'arr'; c.attrs['aria-hidden'] = 'true'
            new.append(c)
        a.children = new
def clean(node):
    for n in list(node.iter()):
        for k in list(n.attrs):
            if k.startswith('data-') or k in ('style',) and '--reveal' not in (n.attrs.get(k) or ''): n.attrs.pop(k, None)
        if n.tag == 'a' and n.attrs.get('target') == '_blank': n.attrs['rel'] = 'noopener'
    for n in node.find_all(pred=lambda n: n.tag in ('script', 'template', 'noscript')): dom.remove(n)
    for n in node.find_all('div', 'prose'): n.attrs['class'] = 'prose'

# ------------------------------------------------------------------ shell
T = {
 'zh': dict(skip='跳至内容', menu='菜单', close='关闭', nav='主导航', events='活动', learn='学习资源', blog='博客', blog_d='架构、观点与实践文章', res='资源中心', res_d='数据组件与 Agent 集成', about='关于社区', lang='EN', lang_label='English', cfp='征集分享',
            email='邮箱地址', sub_off='订阅暂未开放，请先关注社区 Luma 日历。', sub_ok='请查看邮箱确认订阅。', sub_err='暂时无法订阅，请稍后重试。', sub_unk='暂时无法确认订阅结果，请稍后重试或查看邮箱。', sub_busy='订阅中…', copy='复制', copied='已复制', abstract='议题摘要', details='查看'),
 'en': dict(skip='Skip to content', menu='Menu', close='Close', nav='Main navigation', events='Events', learn='Learn', blog='Blog', blog_d='Architecture, ideas, and practice', res='Resources', res_d='Data components and agent integrations', about='About', lang='中文', lang_label='中文', cfp='Call for Proposals',
            email='Email address', sub_off='Subscription is not configured yet. Follow our Luma calendar for updates.', sub_ok='Check your inbox to confirm your subscription.', sub_err='Something went wrong. Please try again.', sub_unk='We could not confirm your subscription. Please check your inbox or try again later.', sub_busy='Subscribing…', copy='Copy', copied='Copied', abstract='Abstract', details='View'),
}
def header(loc, rel):
    t = T[loc]; P = (lambda p: '/zh' + p) if loc == 'zh' else (lambda p: p); home = '/zh' if loc == 'zh' else '/'
    cur = section_of(rel); c = lambda k: ' aria-current="page"' if cur == k else ''
    learn_cur = ' is-current' if cur in ('blog', 'resources') else ''
    return f'''<a class="skip-link" href="#main-content">Skip to content / 跳至内容</a>
<header class="site-header">
  <nav class="site-nav" aria-label="{t['nav']}">
    <a class="brand" href="{home}">{G.logo_mark()}<span>Agentic Data Stack</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-menu" data-open="{t['menu']}" data-close="{t['close']}">{t['menu']}</button>
    <div id="main-menu" class="nav-items">
      <a href="{P('/events')}"{c('events')}>{t['events']}</a>
      <div class="nav-learn{learn_cur}">
        <button class="nav-learn-toggle" type="button" aria-expanded="false" aria-controls="learn-menu">{t['learn']}<span class="chev" aria-hidden="true"></span></button>
        <div id="learn-menu" class="nav-learn-menu" hidden>
          <a href="{P('/blog')}"{c('blog')}><strong>{t['blog']}</strong><small>{t['blog_d']}</small></a>
          <a href="{P('/resources')}"{c('resources')}><strong>{t['res']}</strong><small>{t['res_d']}</small></a>
        </div>
      </div>
      <a href="{P('/about')}"{c('about')}>{t['about']}</a>
      <a class="language-link" href="{counterpart(rel)}" lang="{'en' if loc == 'zh' else 'zh-CN'}" hreflang="{'en' if loc == 'zh' else 'zh-CN'}">{t['lang']}</a>
      <a class="button button-small button-outline" href="{P('/cfp')}"{c('cfp')}>{t['cfp']}<span class="arr" aria-hidden="true">↗</span></a>
    </div>
  </nav>
</header>'''
_FOOT = {}
def footer(loc):
    if loc in _FOOT: return _FOOT[loc]
    root = dom.parse(os.path.join(SRC, 'zh.html' if loc == 'zh' else 'index.html'))
    f = root.find('footer'); clean(f); arrowize(f); forms(f, loc); govern(f)
    if loc == 'zh':
        for h in f.find_all(pred=lambda n: n.tag in ('h2', 'h3')): clauses(h)
    f.attrs['data-theme'] = 'ink'
    brand = f.find('a', 'brand')
    if brand: brand.children = [Raw(G.logo_mark()), Raw('<span>Agentic Data Stack</span>')]
    bottom = f.find('div', 'footer-bottom')
    if bottom: dom.insert_before(bottom, G.rail_divider())
    _FOOT[loc] = f.outer_html(); return _FOOT[loc]
def forms(node, loc):
    t = T[loc]
    for fm in node.find_all('form'):
        fm.attrs.update({'data-subscribe': '', 'novalidate': None}); fm.attrs.pop('action', None)
        dom.add_class(fm, 'compact-subscribe')
        inp = fm.find('input')
        if inp: inp.attrs.update({'name': 'email', 'autocomplete': 'email', 'required': None, 'aria-label': t['email']}); inp.attrs['class'] = 'subscribe-input'
        btn = fm.find('button')
        if btn: btn.attrs['class'] = 'button'; btn.attrs['data-busy'] = t['sub_busy']
        fm.children.append(Raw('<p class="subscribe-message" role="status" aria-live="polite"></p>'))
def page(rel, title, meta, body, body_cls=''):
    loc = loc_of(rel); t = T[loc]
    i18n = E(json.dumps({k: t[k] for k in ('sub_off', 'sub_ok', 'sub_err', 'sub_unk', 'copy', 'copied', 'menu', 'close')}, ensure_ascii=False))
    body = re.sub(r'<span class="arr"(?: aria-hidden="true")?>([→↗↓←])</span>', lambda m: G.arrow(m.group(1)), body)
    head_html = re.sub(r'<span class="arr"(?: aria-hidden="true")?>([→↗↓←])</span>', lambda m: G.arrow(m.group(1)), header(loc, rel))
    foot_source = footer(loc)
    if kind_of(rel) == 'about':
        about_root = dom.parse(os.path.join(SRC, rel))
        faq = about_root.find('section', 'about-faq')
        if faq:
            foot_source = foot_source.replace('<div class="footer-bottom"', faq.outer_html() + '<div class="footer-bottom"', 1)
    foot_html = re.sub(r'<span class="arr"(?: aria-hidden="true")?>([→↗↓←])</span>', lambda m: G.arrow(m.group(1)), foot_source)
    return f'''<!doctype html>
<html lang="{'zh-CN' if loc == 'zh' else 'en'}" class="no-js">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{E(title)}</title>
{chr(10).join(meta)}
<meta name="theme-color" content="#F5F6F1"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<link rel="icon" href="/favicon.ico" sizes="any"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="stylesheet" href="/assets/site.css"/>
<link rel="stylesheet" href="/assets/local-overrides.css"/>
<script>document.documentElement.className='js'</script>
<!-- Newsletter: set the Buttondown username to enable the subscribe forms (same service as the current site). -->
<meta name="buttondown-username" content=""/>
</head>
<body class="page-{kind_of(rel)} {body_cls}" data-i18n="{i18n}">
{head_html}
{body}
{foot_html}
<script src="/assets/site.js" defer></script>
<script src="/assets/local-overrides.js" defer></script>
</body>
</html>
'''

# ------------------------------------------------------------------ shared pieces
# node -> (icon, families). Families tie a node to the clause of the caption sentence that talks about it:
#   agents  = "Agent 的规划与执行"            context = "元数据、语义和业务上下文"
#   data    = "数据存储、查询与流水线"          gov     = "治理、验证和人的协作贯穿全栈"
# The grouping is my reading of the prototype's own sentence; the node names and the three boxes are the prototype's.
ARCH = {
    'Data Analytic Agents': ('chat', 'agents'), 'Data Engineering Agent': ('code', 'agents'), 'Data Ops Agent': ('agent', 'agents'),
    'Data Context Store': ('book', 'context'), 'Context Building Tools': ('blocks', 'context'),
    'Data Source': ('download', 'data'), 'ETL Tools': ('loop', 'data'), 'Streaming Engine': ('waves', 'data'), 'Batch Engine': ('clock', 'data'),
    'Data Warehouse': ('database', 'data'), 'Data Lake': ('lakehouse', 'data'),
    'Data Science & ML Platform': ('graph', 'data'), 'Query Engine': ('search', 'data'), 'Realtime Analytics': ('bolt', 'data'),
    'BI': ('chart', 'data'), 'Data App': ('laptop', 'data'), 'Semantic Layer': ('brackets', 'context'),
    'Metadata': ('tag', 'context gov'), 'Quality & Testing': ('check', 'gov'), 'Data Security': ('shield', 'gov'), 'Data Observability': ('eye', 'gov'),
    'Agent Memory': ('stack', 'agents'), 'Inference Infra': ('chip', 'agents'), '(Post-)Training Infra': ('loop', 'agents'), 'Agent Sandbox': ('box', 'agents'), 'Agent Observability': ('eye', 'gov'),
}
ARCH_STORY = {
    'zh': [('从 Agent 的规划与执行，', 'agents'), ('到元数据、语义和业务上下文，', 'context'), ('再到数据存储、查询与流水线；', 'data'), ('治理、验证和人的协作贯穿全栈。', 'gov')],
    'en': [('From agent planning and execution,', 'agents'), (' through metadata, semantics, and business context,', 'context'), (' to data storage, queries, and pipelines.', 'data'), (' Governance, verification, and human collaboration span the stack.', 'gov')],
}
def arch_story(loc, text):
    """The caption sentence, clause by clause. Falls back to the plain sentence if the prototype copy ever changes."""
    parts = ARCH_STORY[loc]
    if ''.join(t for t, _ in parts).strip() != text.strip(): return f'<p class="arch-story">{E(text)}</p>'
    return '<p class="arch-story">' + ''.join(f'<span class="arch-clause" data-g="{g}" tabindex="0">{E(t)}</span>' for t, g in parts) + '</p>'
def arch_diagram(loc, png_href, caption, story=''):
    """Reference architecture as a system canvas: HTML nodes with icons, an empty SVG layer that site.js fills with wires measured
       from the nodes, and the caption sentence as the legend. Without JS (and in Figma snapshots) the two arrow glyphs stand in for the wires."""
    def box(t):
        ic, fam = ARCH[t]
        return f'<li class="arch-box" data-g="{fam}">{G.icon(ic, 16, "arch-ic")}<span>{E(t)}</span></li>'
    col = lambda items: '<ul class="arch-col">' + ''.join(box(t) for t in items) + '</ul>'
    cols = [['Data Source'], ['ETL Tools', 'Streaming Engine', 'Batch Engine'], ['Data Warehouse', 'Data Lake'], ['Data Science & ML Platform', 'Query Engine', 'Realtime Analytics'], ['BI', 'Data App', 'Semantic Layer']]
    return f'''<figure class="arch">
  <div class="arch-grid" role="img" aria-label="Agentic Data Stack reference architecture">
    <section class="arch-group arch-agents" data-theme="ink"><h3>Data Agents</h3>
      <ul class="arch-row">{''.join(box(t) for t in ['Data Analytic Agents', 'Data Engineering Agent', 'Data Ops Agent', 'Data Context Store', 'Context Building Tools'])}</ul></section>
    <div class="arch-link arch-link-v" aria-hidden="true"><svg viewBox="0 0 24 40"><path d="M12 3V37M6 9L12 3L18 9M6 31L12 37L18 31"/></svg></div>
    <section class="arch-group arch-mds"><h3>Modern Data Stack</h3>
      <div class="arch-cols">{''.join(col(items) for items in cols)}</div>
      <ul class="arch-row arch-gov">{''.join(box(t) for t in ['Metadata', 'Quality & Testing', 'Data Security', 'Data Observability'])}</ul></section>
    <div class="arch-link arch-link-h" aria-hidden="true"><svg viewBox="0 0 40 24"><path d="M3 12H37M9 6L3 12L9 18M31 6L37 12L31 18"/></svg></div>
    <section class="arch-group arch-infra"><h3>Agent Infra</h3>
      <ul class="arch-col">{''.join(box(t) for t in ['Agent Memory', 'Inference Infra', '(Post-)Training Infra', 'Agent Sandbox', 'Agent Observability'])}</ul></section>
    <svg class="arch-wires" aria-hidden="true" focusable="false"></svg>
  </div>
  {('<figcaption class="arch-foot">' + arch_story(loc, story) + '</figcaption>') if story else ''}
</figure>'''
def ticket(loc):
    zh = loc == 'zh'
    rows = [('时间' if zh else 'Time', EVENT['time']), ('地点' if zh else 'Venue', EVENT['venue_short_zh'] if zh else EVENT['venue_short_en']), ('报名' if zh else 'Admission', '免费 · 直接报名' if zh else 'Free · direct registration')]
    return f'''<aside class="ticket" aria-label="{'活动信息' if zh else 'Event pass'}">
  <div class="ticket-top">{G.logo_mark('ticket-mark', 24)}</div>
  <p class="ticket-city">{'杭州' if zh else 'Hangzhou'}</p>
  <p class="ticket-date">2026.11.28 <span>{EVENT['weekday_en'].upper()}</span></p>
  <dl class="ticket-facts">{''.join(f'<div><dt>{E(k)}</dt><dd>{E(v)}</dd></div>' for k, v in rows)}</dl>
  <div class="ticket-stub"><a class="button button-signal" href="#register">{'报名参加活动' if zh else 'Register to attend'}<span class="arr" aria-hidden="true">↓</span></a></div>
</aside>'''
def agenda_html(loc):
    zh = loc == 'zh'; t = T[loc]; out = ['<ol class="agenda">']
    for a in AGENDA:
        title = a['title_zh'] if zh else a['title_en']
        if a['kind'] in ('break', 'networking'):
            out.append(f'<li class="agenda-item is-break"><time>{a["time"]}</time><div class="agenda-body"><h3>{E(title)}</h3><p>{E(a["note_zh"] if zh else a["note_en"])}</p></div></li>'); continue
        name = a['speaker_zh'] if zh else a['speaker_en']; role = a['role_zh'] if zh else a['role_en']
        initial = a['speaker_zh'][0] if zh else ''.join(w[0] for w in a['speaker_en'].split())[:2]
        av = f'<img class="avatar avatar-photo" src="/images/speakers/{a["photo"]}.png" alt="" width="56" height="56" loading="lazy" decoding="async"/>' if a.get('photo') else f'<span class="avatar" aria-hidden="true">{E(initial)}</span>'
        sp = f'<p class="agenda-speaker">{av}<span><strong>{E(name)}</strong>{("<span>" + E(role) + "</span>") if role else ""}</span></p>'
        det = ''
        if zh and (a.get('points_zh') or a.get('para_zh')):
            inner = ('<ul>' + ''.join(f'<li>{E(p)}</li>' for p in a['points_zh']) + '</ul>') if a.get('points_zh') else f'<p>{E(a["para_zh"])}</p>'
            det = f'<details><summary>{t["abstract"]}</summary>{inner}</details>'
        cls = ' is-tba' if a['kind'] == 'tba' else ''
        out.append(f'<li class="agenda-item{cls}"><time>{a["time"]}</time><div class="agenda-body"><h3>{E(title)}</h3>{sp}{det}</div></li>')
    out.append('</ol>')
    if not zh: out.append('<p class="fine-print">Talks are delivered in Chinese. Session abstracts are on the <a href="/zh/events/hangzhou/2026">Chinese page</a>.</p>')
    return ''.join(out)
def skyline(): return G.skyline()
def subscribe_card(loc, h3, p, placeholder, btn, fine):
    t = T[loc]
    return f'''<div class="subscribe-card"><div class="subscribe-card-head">{G.icon('mail', 24)}<div><h3>{E(h3)}</h3><p>{E(p)}</p></div></div>
<form class="compact-subscribe" data-subscribe novalidate><input class="subscribe-input" type="email" name="email" autocomplete="email" required aria-label="{t['email']}" placeholder="{E(placeholder or 'you@company.com')}"/><button class="button" type="submit" data-busy="{t['sub_busy']}">{E(btn)}</button><p class="subscribe-message" role="status" aria-live="polite"></p></form>
{f'<p class="fine-print">{E(fine)}</p>' if fine else ''}</div>'''
def subscribe_card_from(box, loc):
    fm = box.find('form'); fine = [x for x in fm.find_all('p') if not x.has('subscribe-message')]; inp = fm.find('input')
    return subscribe_card(loc, box.find('h3').t(), box.find('p').t(), inp.attrs.get('placeholder'), fm.find('button').t(), fine[0].t() if fine else '')

# ------------------------------------------------------------------ community pages
ICONS = {'日期': 'calendar', 'Date': 'calendar', '时间': 'clock', 'Time': 'clock', '地点': 'pin', 'Location': 'pin', '语言': 'globe', 'Language': 'globe', '报名': 'ticket', 'Admission': 'ticket'}
def transform(main, rel):
    loc = loc_of(rel); kind = kind_of(rel); zh = loc == 'zh'
    clean(main); forms(main, loc)
    for im in main.find_all('img'):
        if (im.attrs.get('src') or '').endswith('datus-white.svg'): im.attrs['src'] = '/images/organizations/datus.svg'
    # co-initiators: the Datus file is a lockup (mark + wordmark) while the other two are mark + site-set name. Use the same recipe for
    # all three so they sit level: mark only, name in the site's type.
    for fm in main.find_all('a', 'founder-mark'):
        im = fm.find('img')
        if im is not None and (im.attrs.get('src') or '').endswith('/datus.svg') and fm.find('strong', 'organization-name') is None:
            im.attrs.update({'src': '/images/organizations/datus-mark.svg', 'width': '48', 'height': '48', 'class': 'is-solid'})
            fm.children.append(Raw('<strong class="organization-name" aria-hidden="true">Datus</strong>'))
        im.attrs.setdefault('loading', 'lazy'); im.attrs.setdefault('decoding', 'async')
    for fr in main.find_all('iframe'):
        fr.attrs.update({'loading': 'lazy', 'title': 'Luma'}); fr.attrs.pop('style', None)
        sh = fr.parent
        if sh and sh.has('embed-shell'): fr.attrs['title'] = (sh.find('div', 'embed-caption').find('span').t() if sh.find('div', 'embed-caption') else 'Luma')
    for pre in main.find_all('pre', 'code-block'):
        dom.replace(pre, f'<div class="code-wrap">{pre.outer_html()}<button class="copy" type="button">{T[loc]["copy"]}</button></div>')
    for sec in main.find_all('section'):
        if sec.find('div', 'cfp-banner'): dom.add_class(sec, 'section-tint')
        if sec.has('definition-section'): dom.add_class(sec, 'section-surface')
    for card in main.find_all('article', 'event-card'):
        card.attrs['data-theme'] = 'ink'
        card.children.append(Raw(f'<div class="event-card-art">{skyline()}</div>'))
    ai = main.find('a', 'architecture-image')
    if ai:
        cap = ai.find('span').t() if ai.find('span') else ''
        # the sentence that follows the diagram becomes its legend (same words, moved into the figure)
        sibs = [c for c in ai.parent.children if isinstance(c, Node)]; i = sibs.index(ai); story = ''
        if i + 1 < len(sibs) and sibs[i + 1].tag == 'p' and sibs[i + 1].has('muted-copy'):
            story = sibs[i + 1].t(); dom.remove(sibs[i + 1])
        dom.replace(ai, arch_diagram(loc, ai.attrs.get('href'), cap, story))
    if kind == 'home':
        hv = main.find('div', 'hero-visual')
        if hv: dom.set_inner(hv, G.hero_diagram(loc))
        card = main.find('article', 'event-card'); eb = main.find('p', 'eyebrow')
        if card and eb:
            ds = [s.t() for s in card.find('div', 'event-date').kids()]
            a = card.find('h3').find('a'); up = main.find('section', 'home-upcoming').find('h2').t()
            when = f'{ds[0]}{ds[1]}日' if zh else f'{ds[0]} {ds[1]}'
            dom.insert_before(eb, f'<a class="hero-notice" href="{E(a.attrs["href"])}"><span class="hero-notice-tag">{E(up)}</span><span>{E(a.t())} · {E(when)}</span><span class="arr" aria-hidden="true">→</span></a>')
    if kind == 'event':
        hero = main.find('section', 'page-hero')
        wrap = Node('div', {'class': 'event-hero-main'}); wrap.children = hero.children
        for c in wrap.children:
            if isinstance(c, Node): c.parent = wrap
        hero.children = [wrap, Raw(ticket(loc))]
        i = main.children.index(hero)
        outer = Node('div', {'class': 'event-hero', 'data-theme': 'ink'}, main); hero.parent = outer
        outer.children = [hero, Raw(f'<div class="event-hero-art">{skyline()}</div>')]
        main.children[i] = outer
        for div in main.find('dl', 'event-facts').kids('div'):
            dt, dd = div.find('dt'), div.find('dd'); k = dt.t()
            if k in ('地点', 'Location'): dd.children = [EVENT['venue_zh'] if zh else EVENT['venue_en']]
            if k in ('日期', 'Date'): dd.children = [f"{EVENT['date_zh']}（{EVENT['weekday_zh']}）" if zh else f"{EVENT['date_en']} ({EVENT['weekday_en']})"]
            if k in ICONS: dt.children.insert(0, Raw(G.icon(ICONS[k], 20)))
        ap = main.find('aside', 'agenda-panel')
        for n in ap.find_all('div', 'agenda-item'): dom.remove(n)
        for n in [c for c in ap.kids('p') if c.has('muted-copy')]: dom.remove(n)
        ap.children.append(Raw(agenda_html(loc)))
        btn = wrap.find('a', 'button')
        main.children.append(Raw(f'<a class="sticky-cta" href="#register">{E(btn.t().rstrip(" ↓"))}<span class="arr" aria-hidden="true">↓</span></a>'))
    if kind == 'newsletter':
        box = main.find('div', pred=lambda n: n.has('rounded-2xl'))
        if box:
            dom.replace(box, subscribe_card_from(box, loc))
    decorate(main, rel)
    arrowize(main)
    return main

TOPIC_ICONS = ['agent', 'book', 'graph', 'lakehouse', 'shield', 'users']
CAT_ICONS = {'catalog-service': 'book', 'lake-format': 'lakehouse', 'sql-engine': 'database', 'semantic-layer': 'brackets', 'etl-elt-tools': 'bolt', 'bi-tools': 'slides', 'data-agents': 'agent', 'scheduler': 'clock', 'graph-database': 'graph'}
PHRASES = {'当 Agent 成为数据系统的使用者与建设者。': ['当 Agent 成为', '数据系统的', '使用者与建设者。'],
           'Agentic Data Stack 杭州 Meetup': ['Agentic Data Stack ', '杭州 Meetup']}
# ---- label governance (2026-11-12): let the layout speak. A secondary label stays only when it carries information
#      the heading and the layout do not: dates and issue numbers on articles, a status, the name of a contents list.
#      Everything that only restates the section ("AGENDA" above the agenda, "FOR SPEAKERS" above the speakers card) goes.
_LABEL_HAS_DATA = re.compile(r'\d{4}|#\d+')
def govern(node):
    for eb in node.find_all(cls='eyebrow'):
        if eb.parent is not None and eb.parent.has('toc'): continue          # names the contents list
        if eb.find(cls='status-pill') is not None: continue                  # a status
        if _LABEL_HAS_DATA.search(eb.t()): continue                          # article date / issue number
        dom.remove(eb)
    for cls in ('hero-principles', 'topic-index', 'footer-subscribe-label'):   # the three principles repeat the hero copy; card numbers are decoration; the form needs no caption
        for n in node.find_all(cls=cls): dom.remove(n)

def clauses(node):
    """Chinese headings break between clauses, never inside a word: each clause becomes an unbreakable inline-block."""
    new = []
    for c in node.children:
        if isinstance(c, str) and not isinstance(c, Raw):
            t = re.sub(r'\s+', ' ', c)
            parts = PHRASES.get(t.strip()) or [p for p in re.split(r'(?<=[，：；、])', t) if p.strip()]
            if len(parts) > 1:
                out = []
                for i, p in enumerate(parts):
                    out.append(f'<span class="nb">{E(p.strip())}</span>')
                    if i < len(parts) - 1 and (p.endswith(' ') or parts[i + 1].startswith(' ')) and not re.search(r'[，：；、]\s*$', p): out.append(' ')
                new.append(Raw(''.join(out))); continue
        elif isinstance(c, Node) and c.tag in ('a', 'em', 'span') and not c.has('nb'): clauses(c)
        new.append(c)
    node.children = new
def decorate(main, rel):
    """Presentation-only additions: clause-level line breaks, icons on topic cards, hero ornament, scrollable tables."""
    kind = kind_of(rel)
    govern(main)
    for h in main.find_all('h1'):          # the prototype marks intended h1 breaks with a newline (white-space: pre-line)
        new = []
        for c in h.children:
            if isinstance(c, str) and not isinstance(c, Raw) and '\n' in c.strip():
                parts = [p.strip() for p in c.strip().split('\n') if p.strip()]
                for i, p in enumerate(parts):
                    if i: new.append(Node('br', {}, h))
                    new.append(p)
            else: new.append(c)
        h.children = new
    if loc_of(rel) == 'zh':
        for h in main.find_all(pred=lambda n: n.tag in ('h1', 'h2') or (n.tag == 'h3' and n.parent is not None and (n.parent.has('article-card') or n.parent.has('agenda-body') or n.parent.has('footer-action-card') or n.parent.has('event-card-body')))):
            if not any(p.has('prose') for p in _parents(h)): clauses(h)
    for grid in main.find_all('div', 'topic-grid'):
        cards = [c for c in grid.kids() if c.has('topic-card')]
        for i, c in enumerate(cards):
            name = None; href = c.attrs.get('href') or ''
            if kind == 'resources':
                name = CAT_ICONS.get(href.rstrip('/').split('/')[-1])
            elif kind in ('home', 'about', 'cfp') and len(cards) in (3, 6):
                name = TOPIC_ICONS[i]
            if name: c.children.insert(0, Raw(G.icon(name, 28, 'icon card-icon')))
    if kind in ('events', 'cfp', 'about', 'resources', 'blog', 'newsletter'):
        hero = main.find('section', 'page-hero')
        if hero: hero.children.append(Raw(G.hero_art()))
    for tb in main.find_all('table'):
        if tb.parent is not None and not tb.parent.has('table-scroll'):
            dom.replace(tb, f'<div class="table-scroll">{tb.outer_html()}</div>')

def replace_parsed(node, markup):
    parent = node.parent
    children = dom.frag(markup)
    for child in children:
        if isinstance(child, Node): child.parent = parent
    index = parent.children.index(node)
    parent.children[index:index + 1] = children

def build_community(rel, raw):
    root = dom.parse(os.path.join(SRC, rel)); main = root.find('main')
    title, meta = head_meta(raw)
    if kind_of(rel) == 'home':
        loc = loc_of(rel)
        for cls, label in [('community-section', 'community'), ('definition-section', 'architecture')]:
            original = main.find('section', cls)
            template = open(os.path.join(HERE, 'templates', f'home-{label}-{loc}.html'), encoding='utf-8').read()
            if label == 'community':
                parsed = dom._P(); parsed.feed(template)
                target_grid = parsed.root.find('div', 'topic-grid')
                local_grid = original.find('div', 'topic-grid')
                if target_grid and local_grid: dom.set_inner(target_grid, local_grid.inner_html(), raw=False)
                template = parsed.root.inner_html()
            replace_parsed(original, template)
    if kind_of(rel) == 'about':
        organizing = main.find('section', 'community-organizing')
        if organizing:
            template = open(os.path.join(HERE, 'templates', f'about-meet-{loc_of(rel)}.html'), encoding='utf-8').read()
            replace_parsed(organizing, template)
    main = transform(main, rel)
    main.attrs = {'id': 'main-content', 'class': 'community-main'}
    return page(rel, title, meta, main.outer_html())

# ------------------------------------------------------------------ older-layout English pages (re-templated)
def inline_html(node):
    """Text + links of a paragraph, as safe HTML."""
    out = []
    for c in node.children:
        if isinstance(c, str): out.append(E(c))
        elif c.tag == 'a':
            ext = ' target="_blank" rel="noopener"' if c.attrs.get('target') else ''
            out.append('<a href="%s"%s>%s</a>' % (E(c.attrs.get('href', '#')), ext, inline_html(c)))
        elif c.tag in ('strong', 'em', 'code', 'b', 'i'): out.append(f'<{c.tag}>{inline_html(c)}</{c.tag}>')
        elif c.tag in ('svg', 'script', 'style'): pass
        else: out.append(inline_html(c))
    return re.sub(r'\s+', ' ', ''.join(out)).strip()
def prose_html(node):
    """Article body passthrough: keep structure, drop presentational classes."""
    for n in node.iter():
        for k in list(n.attrs):
            if k in ('class', 'style') or k.startswith('data-'):
                if not (k == 'class' and n.tag == 'code'): n.attrs.pop(k)
        if n.tag == 'a' and (n.attrs.get('href') or '').startswith('http'): n.attrs.update({'target': '_blank', 'rel': 'noopener'})
        if n.tag == 'img': n.attrs.update({'loading': 'lazy', 'decoding': 'async'})
    return node.inner_html()
def breadcrumb(items):
    out = ['<nav class="breadcrumb" aria-label="Breadcrumb"><ol>']
    for i, (t, h) in enumerate(items):
        out.append('<li>%s</li>' % (('<a href="%s">%s</a>' % (E(h), E(t))) if h else ('<span aria-current="page">%s</span>' % E(t))))
    out.append('</ol></nav>'); return ''.join(out)
WS = re.compile(r'\s+')
def badges_html(bs): return ('<ul class="badges">' + ''.join('<li>%s</li>' % E(b) for b in bs) + '</ul>') if bs else ''
def tags_html(ts): return ('<ul class="tags">' + ''.join(f'<li>{E(t)}</li>' for t in ts) + '</ul>') if ts else ''
def wrap_main(inner): return f'<main id="main-content" class="community-main">{inner}</main>'

def en_resources(rel, root):
    main = root.find('main'); h1 = main.find('h1'); lead = h1.parent.find('p')
    cards = [a for a in main.find_all('a') if re.match(r'^/resources/[^/]+$', a.attrs.get('href') or '')]
    out = [f'<section class="page-hero site-width has-pattern"><h1>{E(h1.t())}</h1><p class="hero-copy">{inline_html(lead)}</p></section>', '<section class="site-section"><div class="site-width topic-grid">']
    for a in cards:
        tx = texts(a); h3 = a.find('h3').t(); desc = a.find('p').t(); rest = tx[tx.index(desc) + 1:] if desc in tx else tx[2:]
        count = ' '.join(rest[:2]); more = rest[2] if len(rest) > 2 else 'Explore →'
        out.append(f'<a class="topic-card" href="{E(a.attrs["href"])}"><span class="topic-index">{E(count)}</span><h3>{E(h3)}</h3><p>{E(desc)}</p><span class="text-link">{E(more)}</span></a>')
    out.append('</div></section>')
    land = next((h for h in main.find_all('h2') if h.t().startswith('Agent Integration')), None)
    if land:
        sec = land.parent; intro = sec.find('p')
        stats = [texts(d) for d in sec.find_all('div', pred=lambda n: n.has('text-center') and n.has('rounded-xl'))]
        out.append(f'<section class="site-section section-surface"><div class="site-width"><div class="section-heading"><p class="eyebrow">LANDSCAPE</p><h2>{E(land.t())}</h2><p class="section-intro">{E(intro.t())}</p></div><dl class="stat-row">' + ''.join(f'<div><dd>{E(v[0])}</dd><dt>{E(v[1])}</dt></div>' for v in stats if len(v) >= 2) + '</dl></div></section>')
    fq = next((h for h in main.find_all('h2') if h.t().startswith('Common Questions')), None)
    if fq:
        sec = next(p for p in _parents(fq) if p.tag == 'section'); intro = fq.parent.find('p')
        out.append(f'<section class="site-section"><div class="site-width faq-layout"><div class="section-heading"><p class="eyebrow">FAQ</p><h2>{E(fq.t())}</h2><p class="section-intro">{E(intro.t())}</p></div><div class="faq">')
        for b in sec.find_all('button'):
            ans = [d for d in b.parent.kids('div')]
            out.append(f'<details class="faq-item"><summary>{E(b.t())}</summary><p>{E(ans[0].t() if ans else "")}</p></details>')
        out.append('</div></div></section>')
    return wrap_main(''.join(out))

def en_category(rel, root):
    main = root.find('main'); bc = main.find('nav')
    crumbs = [(a.t(), a.attrs.get('href')) for a in bc.find_all('a')]; h1 = main.find('h1'); crumbs.append((h1.t(), None))
    ps = [p for p in h1.parent.find_all('p')] or main.find_all('p'); desc = ps[0]
    intro = [p for p in main.find_all('p', 'mt-3')]
    h2 = main.find('h2'); h2t = texts(h2); cnt = ''.join(h2t[1:]) if len(h2t) > 1 else ''
    out = [f'<section class="page-hero site-width">{breadcrumb(crumbs)}<h1>{E(h1.t())}</h1><p class="hero-copy">{E(desc.t())}</p></section>']
    if intro: out.append('<section class="site-section"><div class="site-width reading-width">' + ''.join(f'<p class="{"large-copy" if i == 0 else "muted-copy"}">{E(p.t())}</p>' for i, p in enumerate(intro)) + '</div></section>')
    out.append(f'<section class="site-section"><div class="site-width"><div class="section-heading"><h2>{E(h2t[0])} <span class="count">{E(cnt)}</span></h2></div><div class="tool-grid">')
    for a in main.find_all('a', pred=lambda n: n.has('text-lg') and re.match(r'^/resources/[^/]+/[^/]+$', n.attrs.get('href') or '')):
        box = a.parent.parent; lic = a.parent.find('span'); p = box.find('p')
        bd = box.find('div', 'mb-4'); btx = texts(bd) if bd else []; badges = []; i = 0
        while i < len(btx):
            if btx[i].isdigit() and i + 1 < len(btx): badges.append(btx[i] + ' ' + btx[i + 1]); i += 2
            else: badges.append(btx[i]); i += 1
        det = box.find('a', pred=lambda n: n.t().startswith('Details'))
        ext = [(x.attrs.get('aria-label') or '', x.attrs.get('href')) for x in box.find_all('a') if x.attrs.get('aria-label')]
        extl = ''.join(f'<a href="{E(h)}" target="_blank" rel="noopener" aria-label="{E(l)}">{E(l.split()[-1].capitalize())}<span class="arr" aria-hidden="true">↗</span></a>' for l, h in ext)
        out.append(f'''<article class="tool-card"><header><h3><a href="{E(a.attrs['href'])}">{E(a.t())}</a></h3>{f'<span class="chip">{E(lic.t())}</span>' if lic else ''}</header><p>{E(p.t() if p else '')}</p>{('<ul class="badges">' + ''.join(f'<li>{E(b)}</li>' for b in badges) + '</ul>') if badges else ''}<footer><a class="text-link" href="{E(a.attrs['href'])}">{E(det.t() if det else 'Details →')}</a><span class="tool-ext">{extl}</span></footer></article>''')
    out.append('</div>')
    soon = main.find('section', pred=lambda n: n.has('border-dashed'))
    if soon and soon.find('p'): out.append(f'<div class="empty-note"><p>{inline_html(soon.find("p"))}</p></div>')
    out.append('</div></section>'); return wrap_main(''.join(out))

def en_tool(rel, root):
    main = root.find('main'); bc = main.find('nav'); crumbs = [(a.t(), a.attrs.get('href')) for a in bc.find_all('a')]; h1 = main.find('h1'); crumbs.append((h1.t(), None))
    desc = h1.parent.find('p'); badge_box = [d for d in h1.parent.kids('div')]; badges = texts(badge_box[0]) if badge_box else []
    outer_aside = main.find('aside', pred=lambda n: n.has('hidden')) or main.find('aside')
    in_aside = lambda n: any(p is outer_aside for p in _parents(n))
    sections = {}
    for h2 in main.find_all('h2'):
        if in_aside(h2): continue
        sections[h2.t()] = h2.parent
    out = [f'<section class="page-hero site-width">{breadcrumb(crumbs)}<h1>{E(h1.t())}</h1><p class="hero-copy">{E(desc.t())}</p>{badges_html(badges)}</section>']
    out.append('<section class="site-section"><div class="site-width tool-layout"><div class="tool-main">')
    for name, box in sections.items():
        if name == 'Agent Integration': continue
        if name == 'External Links':
            out.append(f'<h2 class="subheading">{E(name)}</h2><div class="link-cards">')
            for a in box.find_all('a'):
                tx = texts(a)
                if not tx: continue
                out.append(f'<a class="link-card" href="{E(a.attrs.get("href", "#"))}" target="_blank" rel="noopener"><strong>{E(tx[0])}<span class="arr" aria-hidden="true">↗</span></strong>{f"<span>{E(tx[1])}</span>" if len(tx) > 1 else ""}</a>')
            out.append('</div>'); continue
        ul = box.find('ul')
        out.append(f'<h2 class="{"" if name == "About" else "subheading"}">{E(name)}</h2>')
        if ul: out.append('<ul class="guidelines">' + ''.join(f'<li>{E(li.t())}</li>' for li in ul.find_all('li')) + '</ul>')
        else: out += ['<p class="%s">%s</p>' % ('large-copy' if i == 0 else 'muted-copy', E(WS.sub(' ', p.text(' ')).strip())) for i, p in enumerate(box.find_all('p'))]
    back = main.find('a', pred=lambda n: n.t().startswith('←'))
    if back: out.append(f'<a class="text-link back-link" href="{E(back.attrs["href"])}">{E(" ".join(texts(back)))}</a>')
    out.append('</div><aside class="tool-aside">')
    for card in (outer_aside.find_all('aside') if outer_aside else []):
        h3 = card.find('h3'); name = h3.t() if h3 else ''
        links = [(' '.join(texts(a)), a.attrs.get('href')) for a in card.find_all('a')]
        tx = [t for t in texts(card) if t != name]
        body = ''
        if name == 'CLI':
            cmd = tx[tx.index('$') + 1] if '$' in tx and tx.index('$') + 1 < len(tx) else ''
            tool = tx[0] if tx and tx[0] != '$' else ''
            body = (f'<p class="aside-strong">{E(tool)}</p>' if tool else '') + (f'<div class="code-wrap"><pre class="code-block"><code>{E(cmd)}</code></pre><button class="copy" type="button">Copy</button></div>' if cmd else '')
            body += ''.join(f'<a class="aside-link" href="{E(h)}" target="_blank" rel="noopener">{E(t)}<span class="arr" aria-hidden="true">↗</span></a>' for t, h in links)
        elif name == 'Playground':
            btn = card.find('button'); note = [t for t in tx if not btn or t != btn.t()]
            body = ''.join(f'<p>{E(t)}</p>' for t in note) + (f'<button class="button button-outline" type="button" disabled>{E(btn.t())}</button>' if btn else '')
        else:
            linked = {t for t, _ in links}
            body = ''.join(f'<a class="aside-link" href="{E(h)}" target="_blank" rel="noopener">{E(t)}<span class="arr" aria-hidden="true">↗</span></a>' for t, h in links)
            body += ''.join(f'<p class="aside-meta">{E(t)}</p>' for t in tx if t not in linked)
        out.append(f'<section class="aside-card" data-kind="{E(name.lower().replace(" ", "-"))}"><h3>{E(name)}</h3>{body}</section>')
    out.append('</aside></div></section>'); return wrap_main(''.join(out))
def _parents(n):
    while n.parent is not None:
        n = n.parent; yield n

def en_blog(rel, root):
    main = root.find('main'); h1 = main.find('h1'); lead = h1.parent.find('p')
    out = [f'<section class="page-hero site-width has-pattern"><p class="eyebrow">FIELD NOTES / BLOG</p><h1>{E(h1.t())}</h1><p class="hero-copy">{E(lead.t())}</p></section>', '<section class="site-section"><div class="site-width article-list">']
    for a in main.find_all('a', pred=lambda n: re.match(r'^/blog/', n.attrs.get('href') or '')):
        tm = a.find('time'); h3 = a.find('h3'); p = a.find('p'); tx = texts(a)
        meta_bits = [tm.t()] if tm else []
        i = tx.index(tm.t()) + 1 if tm and tm.t() in tx else 0
        rest = tx[i: tx.index(h3.t())] if h3.t() in tx else []
        if len(rest) >= 2 and rest[0].isdigit(): meta_bits.append(rest[0] + ' ' + rest[1]); rest = rest[2:]
        meta_bits += rest
        after = tx[tx.index(p.t()) + 1:] if p and p.t() in tx else []
        tg = after[:-1]; more = after[-1] if after else 'Read article'
        out.append(f'<a class="article-card" href="{E(a.attrs["href"])}"><p class="meta-line">{"".join(f"<span>{E(m)}</span>" for m in meta_bits)}</p><h3>{E(h3.t())}</h3><p>{E(p.t())}</p>{tags_html(tg)}<span class="text-link">{E(more)}<span class="arr" aria-hidden="true">→</span></span></a>')
    out.append('</div></section>'); return wrap_main(''.join(out))

def en_article(rel, root, kind):
    main = root.find('main'); art = main.find('article'); hd = art.find('header'); h1 = hd.find('h1'); lead = hd.find('p')
    crumb = hd.find('a'); tm = hd.find('time'); tx = texts(hd)
    pre = tx[:tx.index(h1.t())]; meta = []
    i = 0
    while i < len(pre):
        t = pre[i]
        if t in ('/', crumb.t()): i += 1; continue
        if t.isdigit() and i + 1 < len(pre): meta.append(t + ' ' + pre[i + 1]); i += 2; continue
        if t.endswith('#') and i + 1 < len(pre): meta.append(t + pre[i + 1]); i += 2; continue
        meta.append(t); i += 1
    after = tx[tx.index(lead.t()) + 1:] if lead and lead.t() in tx else []
    prose = art.find('div', pred=lambda n: n.has('prose'))
    tail_tags = []; back = None
    for d in art.find_all('div'):
        if d.has('flex-wrap') and not any(p is hd for p in _parents(d)) and not any(p is prose for p in _parents(d)): tail_tags = texts(d)
    for a in art.find_all('a'):
        if a.t().startswith('←'): back = a
    toc = []
    aside = art.find('aside')
    if aside:   # the prototype fills this list in the browser ("On this page"); build it here from the article headings
        toc = [(a.t(), a.attrs.get('href')) for a in aside.find_all('a') if (a.attrs.get('href') or '').startswith('#')]
        if not toc and prose is not None: toc = [(h.t(), '#' + h.attrs['id']) for h in prose.find_all('h2') if h.attrs.get('id')]
    byline = ''
    if kind == 'post':
        names = [t for t in after if not re.match(r'^[A-Z]$', t)]
        if names: byline = f'<p class="byline"><span class="avatar" aria-hidden="true">A</span><span><strong>{E(names[0])}</strong>{f"<span>{E(names[1])}</span>" if len(names) > 1 else ""}</span></p>'
        head_tags = ''
    else:
        head_tags = tags_html(after)
    out = [f'<article class="site-width translated-article{" has-toc" if toc else ""}"><div class="article-main">',
           f'<a class="text-link" href="{E(crumb.attrs["href"])}"><span class="arr" aria-hidden="true">←</span>{E(crumb.t())}</a>',
           f'<p class="eyebrow spaced">{"".join(f"<span>{E(m)}</span>" for m in meta)}</p><h1>{E(h1.t())}</h1><p class="hero-copy">{E(lead.t())}</p>{byline}{head_tags}',
           f'<div class="prose">{prose_html(prose)}</div>', tags_html(tail_tags)]
    if back: out.append(f'<a class="text-link back-link" href="{E(back.attrs["href"])}">{E(back.t())}</a>')
    sbox = next((d for d in main.find_all('div', pred=lambda n: n.has('rounded-2xl')) if d.find('form')), None)
    if sbox: out.append(subscribe_card_from(sbox, 'en'))
    out.append('</div>')
    if toc: out.append('<aside class="toc" aria-label="On this page"><p class="eyebrow">ON THIS PAGE</p><ol>' + ''.join(f'<li><a href="{E(h)}">{E(t)}</a></li>' for t, h in toc) + '</ol></aside>')
    out.append('</article>'); return wrap_main(''.join(out))

def en_newsletter(rel, root):
    main = root.find('main'); h1 = main.find('h1'); badge = texts(h1.parent)[0]; lead = h1.parent.find('p')
    box = main.find('div', pred=lambda n: n.has('rounded-2xl'))
    out = [f'<section class="page-hero site-width has-pattern"><p class="eyebrow">{E(badge.upper())}</p><h1>{E(h1.t())}</h1><p class="hero-copy">{E(lead.t())}</p></section>',
           f'<section class="site-section"><div class="site-width reading-width">{subscribe_card_from(box, "en")}']
    h2 = main.find('h2')
    if h2: out.append(f'<h2 class="subheading">{E(h2.t())}</h2>')
    for a in main.find_all('a', pred=lambda n: re.match(r'^/newsletter/', n.attrs.get('href') or '')):
        tm = a.find('time'); t3 = a.find('h3'); pp = a.find('p'); tx = texts(a); num = ''.join(tx[:2]) if tx and tx[0] == '#' else ''
        tg = tx[tx.index(pp.t()) + 1:] if pp and pp.t() in tx else []
        out.append(f'<a class="call-list-item" href="{E(a.attrs["href"])}"><span class="issue-no">{E(num)}</span><span class="issue-body"><strong>{E(t3.t())}</strong><small>{E(tm.t() if tm else "")}</small><span class="issue-desc">{E(pp.t() if pp else "")}</span>{tags_html(tg)}</span><span class="text-link">Read<span class="arr" aria-hidden="true">→</span></span></a>')
    out.append('</div></section>'); return wrap_main(''.join(out))

# ------------------------------------------------------------------ stubs
def stub_404(loc):
    zh = loc == 'zh'; home = '/zh' if zh else '/'
    return wrap_main(f'''<section class="page-hero site-width stub"><p class="eyebrow">404</p><h1>{'页面不存在。' if zh else 'This page could not be found.'}</h1>
<div class="button-row"><a class="button" href="{home}">{'返回首页' if zh else 'Back to home'}<span class="arr" aria-hidden="true">→</span></a><a class="button button-outline" href="{home.rstrip('/')}/events">{'查看活动' if zh else 'Events'}<span class="arr" aria-hidden="true">→</span></a></div>
<div class="stub-art">{G.rail_divider()}</div></section>''')
def stub_coming(root):
    body = root.find('body'); h1 = body.find('h1'); tx = texts(body); links = [(' '.join(texts(a)), a.attrs.get('href')) for a in body.find_all('a') if a.attrs.get('href') and not a.has('skip-link')]
    back = next(((t, h) for t, h in links if h == '/'), None); p = h1.parent.find('p'); pill = next((t for t in tx if t.lower() == 'coming soon'), 'Coming Soon')
    btns = [(t, h) for t, h in links if h != '/']
    return wrap_main(f'''<section class="page-hero site-width stub">{f'<a class="text-link" href="/"><span class="arr" aria-hidden="true">←</span>{E(back[0])}</a>' if back else ''}
<p class="eyebrow"><span class="status-pill">{E(pill)}</span></p><h1>{E(" ".join(texts(h1)))}</h1><p class="hero-copy">{E(p.t() if p else '')}</p>
<div class="button-row">{''.join(f'<a class="button{"" if i == 0 else " button-outline"}" href="{E(h)}" target="_blank" rel="noopener">{E(t)}<span class="arr" aria-hidden="true">↗</span></a>' for i, (t, h) in enumerate(btns))}</div>
<div class="stub-art">{G.rail_divider()}</div></section>''')

# ------------------------------------------------------------------ main
def build():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    pages = []
    for d, _, fs in os.walk(SRC):
        for f in fs:
            if f.endswith('.html'): pages.append(os.path.relpath(os.path.join(d, f), SRC))
    report = {}
    for rel in sorted(pages):
        raw = open(os.path.join(SRC, rel), encoding='utf-8').read(); root = dom.parse(os.path.join(SRC, rel)); main = root.find('main')
        title, meta = head_meta(raw); loc = loc_of(rel); kind = kind_of(rel)
        if 'hangzhou-2026-11-28' in rel or rel.startswith(('cfp/hangzhou/', 'zh/cfp/hangzhou/')):
            prefix = '/zh' if loc == 'zh' else ''
            dest = prefix + ('/cfp' if strip_loc(rel).startswith('cfp/') else '/events/hangzhou/2026')
            out = page(rel, title, meta, wrap_main(f'<p><a href="{dest}">Continue →</a></p><script>location.replace({json.dumps(dest)}+location.search+location.hash)</script>'))
            dst = os.path.join(OUT, rel); os.makedirs(os.path.dirname(dst), exist_ok=True)
            open(dst, 'w', encoding='utf-8').write(out); report[rel] = 'redirect'; continue
        if main is not None and main.has('community-main'):
            out = build_community(rel, raw); how = 'reskin'
        elif main is not None and main.has('page-hero'):
            clean(main); arrowize(main); main.attrs = {'class': 'page-hero site-width stub'}
            body = wrap_main(f'<section class="page-hero site-width stub">{main.inner_html()}<div class="stub-art">{G.rail_divider()}</div></section>')
            out = page(rel, title, meta, body); how = 'stub'
        elif main is not None:
            fn = {'resources': en_resources, 'category': en_category, 'tool': en_tool, 'blog': en_blog, 'newsletter': en_newsletter}.get(kind)
            body = fn(rel, root) if fn else en_article(rel, root, kind)
            pr = dom._P(); pr.feed(body); decorate(pr.root, rel); body = pr.root.inner_html()
            out = page(rel, title, meta, body); how = 'retemplate'
        else:
            body = stub_coming(root) if rel == 'coming-soon.html' else stub_404(loc)
            out = page(rel, title, meta, body); how = 'stub'
        dst = os.path.join(OUT, rel); os.makedirs(os.path.dirname(dst), exist_ok=True)
        open(dst, 'w', encoding='utf-8').write(out); report[rel] = how
    # static files
    shutil.copytree(os.path.join(SRC, 'images'), os.path.join(OUT, 'images'))
    for f in ('CNAME', 'robots.txt', 'sitemap.xml', 'preview.py'):
        if os.path.exists(os.path.join(SRC, f)): shutil.copy(os.path.join(SRC, f), os.path.join(OUT, f))
    shutil.copytree(os.path.join(HERE, 'assets'), os.path.join(OUT, 'assets'))
    fd = os.path.join(OUT, 'assets', 'fonts'); os.makedirs(fd, exist_ok=True)
    for f in os.listdir(os.path.join(HERE, 'static')) if os.path.isdir(os.path.join(HERE, 'static')) else []:
        s = os.path.join(HERE, 'static', f); d = os.path.join(OUT, f)
        if os.path.isdir(s): shutil.copytree(s, d, dirs_exist_ok=True)
        else: shutil.copy(s, d)
    json.dump(report, open(os.path.join(HERE, 'build-report.json'), 'w'), indent=1)
    from collections import Counter
    print(len(pages), 'pages', dict(Counter(report.values())))
if __name__ == '__main__': build()
