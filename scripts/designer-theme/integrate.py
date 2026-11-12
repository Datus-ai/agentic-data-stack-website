"""Render the designer theme from the current Next.js export, never a stale prototype copy."""
from pathlib import Path
import shutil, re, json
import build
ROOT = Path(__file__).resolve().parents[2]
source = ROOT / '.designer-source'
output = ROOT / 'out'
if source.exists(): shutil.rmtree(source)
shutil.copytree(output, source)
# Preserve local updates that postdate the designer's exported prototype.
css = (ROOT / 'app/globals.css').read_text()
overrides = css[css.index('/* Community introduction and configurable photo layouts. */'):]
faq_start = css.index('.about-faq {')
faq_end = css.index('/* Shared light-theme', faq_start)
overrides += '\n' + css[faq_start:faq_end]
overrides += '\n.community-footer .about-faq-item summary {color:#f5f6f1}.community-footer .about-faq-item > p{color:#c4c4bf}\n'
try:
    build.build()
    (output/'assets/local-overrides.css').write_text(overrides)
    (output/'assets/local-overrides.js').write_text('// Community and architecture use the designer interaction in site.js.\n')
except Exception:
    if output.exists():shutil.rmtree(output)
    shutil.copytree(source,output)
    raise
