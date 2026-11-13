# Designer version merge review — 2026-11-12

Merged locally into `feat/community-events-bilingual`; no main merge or production deployment. Designer source: supplied `agentic-data-stack-site-2026-11-12` folder. It is a static generator rather than a Git branch, so conflicts are semantic/content differences, not Git conflict markers.

## Decisions already resolved

- Use the designer brand, navigation, typography, page styling, event presentation and architecture module diagram. The newer local full-screen four-ray walkthrough is retained in the Next prototype source but is not rendered in the designer build, per the owner's latest instruction.
- Community presentation follows the designer layout. Keep all six local topic cards instead of dropping back to the three-card older export. About activity organization follows the designer layout. The previous generated community photo placements are not added to those designer templates.
- Retain localized Feishu forms, shared CFP entry points, canonical city/year event URLs and old redirects (including query/hash), speaker/professional footer CTAs, and seven About-only FAQs.
- Rendering consumes a fresh Next export, not the designer's stale copy of the entire original website. Home community/architecture and About meeting-section templates are deliberate designer presentation overrides under `scripts/designer-theme/templates/`.

## Owner review needed: event facts

The designer package includes an updated event brief in `scripts/designer-theme/event_data.py`. The local designer preview uses these facts. The owner confirmed the agenda and speakers, now synced into `content/events/hangzhou-2026.json`. Venue remains pending review. The owner confirmed 16:40–17:30 as open networking on 2026-11-13.

1. Venue: designer version says **22F, AUX Building, Yuhang District, Hangzhou (杭州市余杭区奥克斯写字楼22层)**; local content says venue details will be announced on Luma. Confirm the new venue.
2. Program and speakers: designer version replaces the single tentative Zhao Heng session with Zhao Heng 13:30–13:50, Ran Panfeng 13:50–14:20, He Jingke 14:20–14:50, break 14:50–15:10, Tang Feihu (topic TBA) 15:10–15:40, Fang Yang 15:40–16:10, Zhang Chen 16:10–16:40. Confirmed by the owner on 2026-11-12; synced to the repository event JSON, which the theme adapter now reads. The opening slot is 20 minutes, despite the package's general note about 30-minute talks.
3. End time: confirmed by the owner on 2026-11-13. The event remains 17:30; 16:40–17:30 is open networking (自由交流), now added to both languages.

Once the remaining venue fact are confirmed, sync those into `content/events/hangzhou-2026.json`. Agenda data already uses this single source. Until then, do not treat this local draft as publication approval. Metadata remains sourced from the original content, so it must be synced with the confirmed facts before deployment.

## Existing configuration gap

Newsletter account is still not configured. This was already true before the design merge. The theme displays the existing unavailable message rather than collecting submissions silently. Set the Buttondown username through the theme adapter before activating signup.

## Validation

- Full Next + designer export, including TypeScript.
- Link/asset audit via `python3 scripts/designer-theme/audit.py`.
- Existing five community tests and designer JavaScript syntax check.
- `merge-audit.json` records per-page text deltas. Most are intentionally removed duplicate category/eyebrow labels and replaced hero illustration captions; the substantive changes are the designer architecture presentation and proposed event facts above.
