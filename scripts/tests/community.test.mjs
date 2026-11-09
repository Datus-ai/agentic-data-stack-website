import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  getEvents,
  isPast,
  cfpOpen,
  cfpState,
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
test("CFP does not open without a real form and closes at its deadline", () => {
  assert.equal(cfpOpen(event, now), false);
  const active = {
    ...event,
    cfp: {
      ...event.cfp,
      status: "open",
      formUrl: "https://example.com/form",
      deadline: "2026-11-20T00:00:00Z",
    },
  };
  assert.equal(cfpOpen(active, now), true);
  assert.equal(
    cfpOpen({ ...active, cfp: { ...active.cfp, formUrl: null } }, now),
    false,
  );
  assert.equal(cfpOpen(active, Date.parse(active.cfp.deadline)), false);
  assert.equal(
    cfpOpen({ ...active, cfp: { ...active.cfp, status: "closed" } }, now),
    false,
  );
  assert.equal(cfpOpen(active, Date.parse(event.endAt)), false);
});
test("events have valid dates, bilingual content and safe public embed URLs", () => {
  const slugs = new Set();
  for (const e of getEvents()) {
    assert.ok(!slugs.has(e.slug));
    slugs.add(e.slug);
    assert.match(e.slug, /^[a-z0-9-]+$/);
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
    if (e.cfp.status === "open") {
      assert.ok(e.cfp.formUrl);
      assert.equal(new URL(e.cfp.formUrl).protocol, "https:");
    }
  }
});
test("no fabricated recaps or testimonials are present in the launch event", () => {
  assert.equal(event.recap, null);
  assert.deepEqual(event.testimonials, []);
  assert.deepEqual(event.organizerIds, []);
});

test("expired CFP is closed, never relabeled coming soon", () => {
 const active = {...event, cfp: {...event.cfp, status: "open", formUrl: "https://example.com/form", deadline: "2026-11-20T00:00:00Z"}};
 assert.equal(cfpState(event, now), "coming-soon");
 assert.equal(cfpState(active, now), "open");
 assert.equal(cfpState(active, Date.parse(active.cfp.deadline)), "closed");
});
