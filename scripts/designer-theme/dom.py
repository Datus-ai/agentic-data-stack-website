"""Tiny DOM for the exported prototype (no external deps)."""
import re, html as _html
from html.parser import HTMLParser
class Raw(str):
    """HTML fragment inserted verbatim (already valid markup)."""
VOID = {'img','br','hr','input','meta','link','source','wbr','area','base','col','embed','track'}
class Node:
    __slots__ = ('tag','attrs','children','parent')
    def __init__(s, tag, attrs=None, parent=None): s.tag, s.attrs, s.children, s.parent = tag, dict(attrs or {}), [], parent
    @property
    def cls(s): return (s.attrs.get('class') or '').split()
    def has(s, c): return c in s.cls
    def iter(s):
        yield s
        for c in s.children:
            if isinstance(c, Node): yield from c.iter()
    def find_all(s, tag=None, cls=None, pred=None):
        return [n for n in s.iter() if n is not s and (tag is None or n.tag == tag) and (cls is None or n.has(cls)) and (pred is None or pred(n))]
    def find(s, tag=None, cls=None, pred=None):
        r = s.find_all(tag, cls, pred); return r[0] if r else None
    def text(s, sep=''):
        out = []
        for c in s.children:
            if isinstance(c, str): out.append(c)
            elif c.tag in ('script','style','svg','noscript','template'): continue
            elif c.tag == 'br': out.append('\n')
            else: out.append(c.text(sep))
        return sep.join(out)
    def t(s):  # normalised text
        return re.sub(r'[ \t\r\f\v]*\n[ \t\r\f\v]*', '\n', re.sub(r'[ \t\r\f\v]+', ' ', s.text())).strip()
    def kids(s, tag=None): return [c for c in s.children if isinstance(c, Node) and (tag is None or c.tag == tag)]
    def inner_html(s):
        raw = s.tag in ('script', 'style')
        return ''.join(c.outer_html() if isinstance(c, Node) else (c if (isinstance(c, Raw) or raw) else _html.escape(c, quote=False)) for c in s.children)
    def outer_html(s):
        a = ''.join(f' {k}="{_html.escape(str(v), quote=True)}"' if v is not None else f' {k}' for k, v in s.attrs.items())
        if s.tag in VOID: return f'<{s.tag}{a}>'
        return f'<{s.tag}{a}>{s.inner_html()}</{s.tag}>'
class _P(HTMLParser):
    def __init__(s): super().__init__(convert_charrefs=True); s.root = Node('root'); s.cur = s.root
    def handle_starttag(s, tag, attrs):
        n = Node(tag, attrs, s.cur); s.cur.children.append(n)
        if tag not in VOID: s.cur = n
    def handle_startendtag(s, tag, attrs):
        s.cur.children.append(Node(tag, attrs, s.cur))
    def handle_endtag(s, tag):
        c = s.cur
        while c is not s.root and c.tag != tag: c = c.parent
        if c is not s.root: s.cur = c.parent
    def handle_data(s, d): s.cur.children.append(d)
def frag(markup):
    """Parse a markup string into a list of child nodes."""
    p = _P(); p.feed(markup)
    for c in p.root.children:
        if isinstance(c, Node): c.parent = None
    return p.root.children
def set_inner(node, markup, raw=True):
    node.children = [Raw(markup)] if raw else frag(markup)
def replace(node, markup):
    par = node.parent; i = par.children.index(node); par.children[i:i+1] = [Raw(markup)]
def insert_after(node, markup):
    par = node.parent; i = par.children.index(node); par.children.insert(i + 1, Raw(markup))
def insert_before(node, markup):
    par = node.parent; i = par.children.index(node); par.children.insert(i, Raw(markup))
def remove(node):
    node.parent.children.remove(node)
def add_class(node, c):
    cur = node.attrs.get('class') or ''
    if c not in cur.split(): node.attrs['class'] = (cur + ' ' + c).strip()
def parse(path):
    p = _P(); p.feed(open(path, encoding='utf-8').read()); return p.root
def dump(n, depth=0, maxdepth=40, out=None):
    out = [] if out is None else out
    if isinstance(n, str):
        t = re.sub(r'\s+', ' ', n).strip()
        if t: out.append('  ' * depth + '"' + t[:160] + '"')
        return out
    if n.tag in ('script','style','noscript','template'): return out
    if n.tag == 'svg': out.append('  ' * depth + '<svg>'); return out
    a = ' '.join(f'{k}={str(v)[:60]}' for k, v in n.attrs.items() if k in ('class','href','id','src','alt','type','placeholder','aria-label','lang','target','datetime','name'))
    out.append('  ' * depth + f'<{n.tag} {a}>')
    if depth < maxdepth:
        for c in n.children: dump(c, depth + 1, maxdepth, out)
    return out
if __name__ == '__main__':
    import sys
    root = parse(sys.argv[1]); sel = sys.argv[2] if len(sys.argv) > 2 else 'main'
    tgt = root.find(sel) or root
    lines = dump(tgt); a = int(sys.argv[3]) if len(sys.argv) > 3 else 0; b = int(sys.argv[4]) if len(sys.argv) > 4 else 150
    print('\n'.join(lines[a:b]))
