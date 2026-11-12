"""Hangzhou meetup facts. Source: Feishu doc「[设计需求]Agentic Data Stack Meetup｜杭州站」(first read 2026-11-11 14:57; re-read 2026-11-12 after the organiser's 11-11 16:21 edit: talks are 30 min, last talk ends 16:40) + the exported site."""
EVENT = {
    'slug': 'hangzhou/2026',
    'name_doc': 'Agentic Data Stack Meetup｜杭州站',
    'date_iso': '2026-11-28', 'date_zh': '2026年11月28日', 'date_en': 'November 28, 2026', 'weekday_zh': '周六', 'weekday_en': 'Sat',
    'time': '13:30–17:30', 'tz': 'UTC+8',
    'venue_zh': '杭州市余杭区奥克斯写字楼 22 层',
    'venue_short_zh': '余杭区奥克斯写字楼 22 层',
    'venue_en': '22F, AUX Building (奥克斯写字楼), Yuhang District, Hangzhou',
    'venue_short_en': '22F, AUX Building, Yuhang',
    'hosts': 'Datus × NebulaGraph × StarRocks',
    'luma_event': 'https://luma.com/event/evt-dwoJFiooN0NPAJE',
}
# The owner confirmed the designer agenda on 2026-11-12. The repository event JSON is now the source of truth.
import json
from pathlib import Path
_event = json.loads((Path(__file__).resolve().parents[2] / 'content/events/hangzhou-2026.json').read_text())
AGENDA = []
for slot in _event['agenda']:
    entry = dict(slot.get('designer', {}))
    entry.update(time=slot['time'], title_en=slot['title']['en'], title_zh=slot['title']['zh'])
    if slot.get('speaker'):
        entry.update(speaker_en=slot['speaker']['en'], speaker_zh=slot['speaker']['zh'])
    AGENDA.append(entry)

TALKS = [a for a in AGENDA if a['kind'] != 'break']
# portraits: speakers/raw (from the brief) -> speakers.py -> static/images/speakers/<photo>.png (web) and speakers/work/<photo>-640.png (materials)
STARTS = [a['time'][:5] for a in AGENDA]
