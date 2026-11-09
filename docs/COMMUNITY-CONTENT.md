# Community and events content guide

English URLs are retained. Chinese pages live at `/zh`. Next.js exports static pages to `out/` using the existing GitHub Pages workflow.

## Sources

- Community positioning and definition: user-provided Google Doc `14vFN_ihxg_hBhOLl3MXoKl8IANdanHjNEx4NFefmKV0`.
- Co-initiators: DatusAI, NebulaGraph, StarRocks. The document's `NebularGraph` spelling is normalized to the organization's official `NebulaGraph` spelling.
- Hangzhou event times, admission, and hosts: public Luma embed, checked 2026-11-09. 2026-11-28 13:30–17:30 Asia/Shanghai; free, approval required. Hosts: Joanna He and NebulaGraph. Venue is currently only Hangzhou.
- Tentative first agenda item: community introduction document. No unconfirmed full agenda, attendance numbers, or testimonials are published.

## Add or update an event

Edit `content/events/*.json`. Use the Hangzhou event as the template. Use a city/year slug, such as `hangzhou/2026`, so the canonical event URL is `/events/hangzhou/2026` and its CFP is `/cfp/hangzhou/2026`. Do not include a month, day, or `meetup` in the URL. Keep published slugs stable; `previousSlugs` preserves legacy single-segment URLs as redirects. Only canonical URLs appear in the sitemap. If more than one event is held in the same city and year, agree on a distinct additional route before publishing; do not overwrite the existing event. Supply English and Chinese text. Set ISO start/end timestamps including an offset or `Z`, plus an IANA timezone. `organizerIds` contains only confirmed per-event organization IDs from `lib/community.ts`; co-initiators are not automatically event organizers. `hosts` reflects named event hosts.

Luma calendar is configured in `lib/community.ts`; per-event embeds and direct links live in the event file. Both embed types are responsive, have accessible titles, and always show a direct-open fallback. Registrations, approval, waitlists and confirmation are owned by Luma; the website does not claim successful registration from iframe load events. Embedded external UI follows Luma's own language settings.

## Enable the Feishu CFP when ready

1. Set `cfp.formUrl` to the public HTTPS form link (never a private responses-table link).
2. Set `cfp.deadline` to the confirmed ISO timestamp with timezone, and `notificationDate` to the communicated notification date.
3. Update `cfp.formats` in both languages; set `cfp.status` to `open`.
4. Verify the live form as a logged-out visitor, on desktop/mobile and with the intended international audience. Some forms block third-party embedding. The visible direct-open link remains available.
5. Submit a real test entry with the owner's consent; verify it in Feishu and remove the test record there.
6. When the call closes, stop collection in Feishu, set status to `closed`, and deploy the content update.

Until a real form is configured, the website shows “Coming soon” and does not render a dummy form. Add bilingual field labels inside Feishu; switching website language does not translate third-party forms.

## Recaps and quotes

`recap: null` means no recap route is published. When ready, replace it with:

```json
{
  "title": {"en":"Event recap", "zh":"活动回顾"},
  "summary": {"en":"Approved summary", "zh":"已确认的活动总结"},
  "takeaways": [{"en":"A key takeaway", "zh":"一项主要收获"}],
  "photos": [{"src":"/images/events/photo.jpg", "alt":{"en":"Photo description", "zh":"照片说明"}}],
  "sessions": [{"title":{"en":"Session", "zh":"议题"}, "speaker":"Name", "summary":{"en":"Summary", "zh":"摘要"}, "recordingUrl":"https://...", "slidesUrl":"https://...", "codeUrl":"https://..."}]
}
```

Recording, slides and code links are optional. Add quotes to `testimonials` only after permission: `{ "quote": {"en":"...","zh":"..."}, "name":"...", "role":{"en":"...","zh":"..."}, "consent":true }`. Unapproved quotes are not rendered. Recaps live at `/events/{slug}/recap`; the original event URL remains available.

## Maintenance and translations

Core community copy: `lib/community.ts`. Chinese published articles: `content/zh/blog`. Chinese newsletter editorial versions: `content/zh/newsletter`. The existing unpublished definition article remains a draft and is not linked from the homepage. Chinese resource summaries and integration metadata are available; extended vendor feature lists remain in the linked English technical reference. Review new translations before publishing. Newsletter signup requires the existing `NEXT_PUBLIC_BUTTONDOWN_USERNAME` deployment setting.

Every content change requires a new static build. Date-derived archive and CFP states are evaluated during that build. Publish an update or manually run the existing deployment workflow when an event ends or a CFP deadline is reached; no scheduled workflow has been added. Luma independently enforces live registration availability. Do not rely solely on static website state to close a form.

## Remaining owner-provided material

- Final venue, confirmed program, speaker biographies/photos, per-event organizing roles.
- Feishu CFP link, deadline, review notifications, accepted formats/durations, and recording terms.
- Community contribution contact if a separate email is desired (currently visitors can contact hosts via Luma).
- Authorized recap materials and attendee quotes after the first event.
