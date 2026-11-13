import { test } from "node:test";
import assert from "node:assert/strict";
import { getCfpConfig, isCfpOpen } from "../../lib/cfp.ts";
import {
  getEvents,
  getEvent,
  getEventRouteParams,
  getCanonicalEventParams,
  isPast,
  registrationOpen,
} from "../../lib/events.ts";
const event = getEvents()[0];
const now = Date.parse("2026-11-09T00:00:00Z");
test("confirmed event dates and current registration match supplied Luma event", () => {
  assert.equal(event.lumaId, "evt-dwoJFiooN0NPAJE");
  assert.equal(event.startAt, "2026-11-28T05:30:00.000Z");
  assert.equal(registrationOpen(event, now), true);
  assert.equal(isPast(event, Date.parse(event.endAt)), true);
  assert.equal(registrationOpen(event, Date.parse(event.endAt)), false);
});
test("the single community CFP opens only with a real form, independently of event dates", () => {
  const config = getCfpConfig();
  assert.equal(isCfpOpen(config,"en"), true);
  assert.equal(isCfpOpen(config,"zh"), true);
  assert.equal(config.formUrls.en, "https://gaaoegmov5r.feishu.cn/share/base/form/shrcnSKtLBAfjvDXOMO3dQUDT7b");
  assert.equal(config.formUrls.zh, "https://gaaoegmov5r.feishu.cn/share/base/form/shrcnOvVIk30ciancZbb0wx1CAb");
  assert.equal(isCfpOpen({status:"open",formUrls:{en:null,zh:config.formUrls.zh}},"en"),false);
  assert.equal(isCfpOpen({...config,status:"closed"},"en"),false);
  assert.ok(!("cfp" in event));
});
test("events have valid dates, bilingual content and safe public embed URLs", () => {
  const slugs = new Set();
  for (const e of getEvents()) {
    assert.ok(!slugs.has(e.slug));
    slugs.add(e.slug);
    assert.match(e.slug, /^[a-z0-9-]+\/\d{4}$/);
    assert.ok(Date.parse(e.endAt) > Date.parse(e.startAt));
    assert.doesNotThrow(
      () => new Intl.DateTimeFormat("en", { timeZone: e.timezone }),
    );
    for (const field of ["title", "description", "city", "venue", "language"]) {
      assert.ok(e[field].en);
      assert.ok(e[field].zh);
    }
    for (const key of ["registrationUrl", "registrationEmbed"])
      assert.equal(new URL(e[key]).protocol, "https:");
    assert.equal(new URL(e.registrationEmbed).hostname, "luma.com");

  }
});
test("no fabricated recaps or testimonials are present in the launch event", () => {
  assert.equal(event.recap, null);
  assert.deepEqual(event.testimonials, []);
  assert.deepEqual(event.organizerIds, []);
});

test("event URLs are date-free and old event links resolve to their canonical event", () => {
  for (const e of getEvents()) {
    assert.doesNotMatch(e.slug, /\d{4}-\d{2}-\d{2}/);
    for (const old of e.previousSlugs || []) {
      assert.equal(getEvent(old)?.slug, e.slug);
      assert.ok(getEventRouteParams().some(p => p.slug === old));
    }
  }
  assert.equal(getEvent("hangzhou/2026")?.lumaId, "evt-dwoJFiooN0NPAJE");
  assert.deepEqual(getCanonicalEventParams(), [{slug:"hangzhou",year:"2026"}]);
});
