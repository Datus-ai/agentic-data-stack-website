"""Verify rendered links/assets and report content deltas against this build's Next export."""
from pathlib import Path
import json,re,sys
from urllib.parse import urlsplit,unquote
import dom
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'out';SRC=ROOT/'.designer-source'
def texts(node):
    result=[]
    if node is None:return result
    for child in node.children:
        if isinstance(child,str):
            if child.strip():result.append(child.strip())
        elif child.tag not in ('script','style','svg','noscript','template'):result.extend(texts(child))
    return result
norm=lambda text: re.sub(r'[\W_]+','',text).lower()
errors=[];deltas={};count=0
for path in sorted(OUT.rglob('*.html')):
    root=dom.parse(str(path));base=SRC/path.relative_to(OUT)
    if base.exists():
        old=dom.parse(str(base));newtext=norm(' '.join(texts(root)))
        missing=[t for t in texts(old.find('main')) if len(norm(t))>10 and norm(t) not in newtext]
        if missing:deltas[str(path.relative_to(OUT))]=missing
    for node in root.iter():
        for attr in ('href','src'):
            value=node.attrs.get(attr)
            if not value:continue
            parsed=urlsplit(value)
            if parsed.scheme or parsed.netloc:continue
            target=(OUT/unquote(parsed.path).lstrip('/')) if parsed.path.startswith('/') else path.parent/unquote(parsed.path)
            if not parsed.path:target=path
            if target.is_dir() and (target/'index.html').exists():target=target/'index.html'
            elif Path(str(target)+'.html').exists():target=Path(str(target)+'.html')
            count+=1
            if not target.exists():errors.append({'page':str(path.relative_to(OUT)),'url':value})
report={'checked_links':count,'broken_links':errors,'content_deltas':deltas}
(ROOT/'scripts/designer-theme/merge-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'checked_links':count,'broken_links':errors[:20],'pages_with_content_deltas':len(deltas),'sample_deltas':dict(list(deltas.items())[:4])},ensure_ascii=False,indent=2))
if errors:sys.exit(1)
