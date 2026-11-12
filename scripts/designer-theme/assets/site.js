/* Agentic Data Stack — site interactions (no dependencies) */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement, body = doc.body;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var i18n = {}; try { i18n = JSON.parse(body.getAttribute('data-i18n') || '{}'); } catch (e) {}
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 861px)');

  /* header: hairline once the page scrolls */
  var header = $('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* mobile menu */
  var toggle = $('.menu-toggle'), menu = $('#main-menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle('is-open', open); body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? toggle.getAttribute('data-close') : toggle.getAttribute('data-open');
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  desktop.addEventListener ? desktop.addEventListener('change', function () { setMenu(false); }) : desktop.addListener(function () { setMenu(false); });

  /* "Learn" dropdown: click, hover intent on desktop, Esc / outside / focus-out to close, arrow keys to move */
  var learn = $('.nav-learn'), learnBtn = $('.nav-learn-toggle'), learnMenu = $('#learn-menu'), hoverTimer;
  function setLearn(open) {
    if (!learnBtn || !learnMenu) return;
    learnBtn.setAttribute('aria-expanded', String(open));
    if (open) learnMenu.removeAttribute('hidden'); else learnMenu.setAttribute('hidden', '');
  }
  if (learn && learnBtn && learnMenu) {
    learnBtn.addEventListener('click', function () { setLearn(learnBtn.getAttribute('aria-expanded') !== 'true'); });
    learn.addEventListener('mouseenter', function () { if (!desktop.matches) return; clearTimeout(hoverTimer); hoverTimer = setTimeout(function () { setLearn(true); }, 120); });
    learn.addEventListener('mouseleave', function () { if (!desktop.matches) return; clearTimeout(hoverTimer); hoverTimer = setTimeout(function () { setLearn(false); }, 160); });
    learn.addEventListener('focusout', function (e) { if (!learn.contains(e.relatedTarget)) setLearn(false); });
    learn.addEventListener('keydown', function (e) {
      var items = $$('a', learnMenu), i = items.indexOf(doc.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); setLearn(true); (items[i + 1] || items[0]).focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setLearn(true); (items[i - 1] || items[items.length - 1]).focus(); }
    });
    doc.addEventListener('click', function (e) { if (!learn.contains(e.target)) setLearn(false); });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (learnBtn && learnBtn.getAttribute('aria-expanded') === 'true') { setLearn(false); learnBtn.focus(); }
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
  });

  /* newsletter forms (Buttondown embed endpoint; username comes from <meta name="buttondown-username">) */
  var bd = ($('meta[name="buttondown-username"]') || {}).content || '';
  $$('form[data-subscribe]').forEach(function (form) {
    var input = $('input[type="email"]', form), btn = $('button[type="submit"]', form), msg = $('.subscribe-message', form), label = btn ? btn.textContent : '';
    function say(state, text) { if (!msg) return; msg.setAttribute('data-state', state); msg.textContent = text || ''; }
    if (input) input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); if (msg && msg.getAttribute('data-state') !== 'ok') say('', ''); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!input || !input.value || !input.checkValidity()) { if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); } return; }
      if (!bd) { say('off', i18n.sub_off); return; }
      btn.disabled = true; btn.textContent = btn.getAttribute('data-busy') || label; say('', '');
      fetch('https://buttondown.com/api/emails/embed-subscribe/' + encodeURIComponent(bd), {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email=' + encodeURIComponent(input.value)
      }).then(function (res) {
        if (res.type === 'opaque' || res.ok) { form.classList.add('is-done'); say('ok', i18n.sub_ok); }
        else say('error', i18n.sub_err);
      }).catch(function () { say('error', navigator.onLine === false ? i18n.sub_err : i18n.sub_unk); })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
  });

  /* copy buttons on install commands */
  $$('.code-wrap .copy').forEach(function (btn) {
    var label = btn.textContent, t;
    btn.addEventListener('click', function () {
      var code = ($('code', btn.parentNode) || {}).textContent || '';
      var done = function () { btn.textContent = (i18n.copied || 'Copied') + ' ✓'; btn.classList.add('is-done'); clearTimeout(t); t = setTimeout(function () { btn.textContent = label; btn.classList.remove('is-done'); }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done, function () {});
      else { var ta = doc.createElement('textarea'); ta.value = code; ta.style.position = 'fixed'; ta.style.opacity = '0'; body.appendChild(ta); ta.select(); try { doc.execCommand('copy'); done(); } catch (e) {} body.removeChild(ta); }
    });
  });

  /* Luma embeds fade in once loaded */
  $$('.luma-frame').forEach(function (f) { f.addEventListener('load', function () { f.classList.add('is-loaded'); }); setTimeout(function () { f.classList.add('is-loaded'); }, 4000); });

  /* event page: sticky register bar on small screens */
  var sticky = $('.sticky-cta'), heroBtn = $('.event-hero .button'), reg = $('#register');
  if (sticky && heroBtn && reg && 'IntersectionObserver' in window) {
    var past = false, atReg = false, upd = function () { sticky.classList.toggle('is-shown', past && !atReg); };
    new IntersectionObserver(function (es) { past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; upd(); }).observe(heroBtn);
    new IntersectionObserver(function (es) { atReg = es[0].isIntersecting; upd(); }, { rootMargin: '0px 0px -30% 0px' }).observe(reg);
  }

  /* long-form pages: heading anchors + table of contents highlight */
  $$('.prose h2[id], .prose h3[id]').forEach(function (h) {
    var a = doc.createElement('a'); a.className = 'heading-anchor'; a.href = '#' + h.id; a.textContent = '#'; a.setAttribute('aria-label', h.textContent); h.insertBefore(a, h.firstChild);
  });
  var tocLinks = $$('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {}; tocLinks.forEach(function (a) { map[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting && map[en.target.id]) { tocLinks.forEach(function (a) { a.classList.remove('is-active'); }); map[en.target.id].classList.add('is-active'); } });
    }, { rootMargin: '-96px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var el = doc.getElementById(id); if (el) io2.observe(el); });
  }

  /* diagrams. .is-paused: a loop has scrolled out of view. .is-live: the architecture tour may run. .in-view: line art draws in, once.
     Nothing waits on an observer to become visible: what is on screen at load is handled straight away. */
  var liveEls = $$('.hero-visual, .event-hero-art'), drawEls = $$('.event-hero-art, .event-card-art, .page-hero-art, .rail-divider');
  var onScreen = function (el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; };
  var later = window.requestAnimationFrame ? function (fn) { requestAnimationFrame(function () { requestAnimationFrame(fn); }); } : function (fn) { setTimeout(fn, 32); };
  var hasIO = 'IntersectionObserver' in window;
  var drawIO = hasIO ? new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in-view'); drawIO.unobserve(en.target); } }); }, { threshold: 0.15 }) : null;
  drawEls.forEach(function (el) {
    if (!drawIO || onScreen(el)) later(function () { el.classList.add('in-view'); });
    else drawIO.observe(el);
  });
  if (hasIO) {
    var liveIO = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('is-live', en.isIntersecting); en.target.classList.toggle('is-paused', !en.isIntersecting); }); }, { threshold: 0.3 });
    liveEls.forEach(function (el) { liveIO.observe(el); });
  } else liveEls.forEach(function (el) { el.classList.add('is-live'); });

  /* reference architecture (home): the nodes are HTML, the wires are an SVG layer measured from them.
     The sentence under the diagram is its legend: each clause lights the nodes it talks about. On screen, the four clauses take turns. */
  var arch = $('.arch');
  if (arch && $('.arch-wires', arch)) (function () {
    var grid = $('.arch-grid', arch), svg = $('.arch-wires', arch), NS = 'http://www.w3.org/2000/svg';
    var wideQ = window.matchMedia('(min-width: 1101px)');
    var at = function (el) { var x = 0, y = 0, n = el; while (n && n !== grid) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y, w: el.offsetWidth, h: el.offsetHeight, r: x + el.offsetWidth, b: y + el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 }; };
    var el = function (cls, d, attrs) { var p = doc.createElementNS(NS, 'path'); p.setAttribute('class', cls); p.setAttribute('d', d); for (var k in attrs || {}) p.setAttribute(k, attrs[k]); svg.appendChild(p); return p; };
    var R = function (v) { return Math.round(v * 2) / 2; };
    var wire = function (d) { el('aw', d, { pathLength: 1 }); };
    var beam = function (d, w, i, sig) { var p = el('aw-beam' + (sig ? ' is-signal' : ''), d, { pathLength: 1, 'data-w': w }); p.style.setProperty('--i', i || 0); };
    var head = function (x, y, dir) {   /* small chevron pointing at (x, y) */
      var s = 4, d = dir === 'r' ? 'M' + (x - s) + ' ' + (y - s) + 'L' + x + ' ' + y + 'L' + (x - s) + ' ' + (y + s) : dir === 'l' ? 'M' + (x + s) + ' ' + (y - s) + 'L' + x + ' ' + y + 'L' + (x + s) + ' ' + (y + s) : dir === 'd' ? 'M' + (x - s) + ' ' + (y - s) + 'L' + x + ' ' + y + 'L' + (x + s) + ' ' + (y - s) : 'M' + (x - s) + ' ' + (y + s) + 'L' + x + ' ' + y + 'L' + (x + s) + ' ' + (y + s);
      el('aw-head', d);
    };
    function elbow(x1, y1, xm, x2, y2) {   /* right, turn at xm, right again: rounded corners */
      if (Math.abs(y1 - y2) < 1) return 'M' + x1 + ' ' + y1 + 'H' + x2;
      var r = Math.min(7, Math.abs(y2 - y1) / 2), s = y2 > y1 ? 1 : -1;
      return 'M' + x1 + ' ' + y1 + 'H' + (xm - r) + 'Q' + xm + ' ' + y1 + ' ' + xm + ' ' + (y1 + s * r) + 'V' + (y2 - s * r) + 'Q' + xm + ' ' + y2 + ' ' + (xm + r) + ' ' + y2 + 'H' + x2;
    }
    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      if (!wideQ.matches) { arch.classList.remove('has-wires'); return; }
      svg.setAttribute('viewBox', '0 0 ' + grid.offsetWidth + ' ' + grid.offsetHeight);
      var ag = at($('.arch-agents', arch)), md = at($('.arch-mds', arch)), inf = at($('.arch-infra', arch));
      /* pipeline: every column feeds the next through a small bus */
      var cols = $$('.arch-cols .arch-col', arch).map(function (c) { return $$('.arch-box', c).map(at); });
      for (var c = 0; c < cols.length - 1; c++) {
        var A = cols[c], B = cols[c + 1];
        var xa = R(Math.max.apply(null, A.map(function (b) { return b.r; }))), xb = R(Math.min.apply(null, B.map(function (b) { return b.x; }))), xm = R((xa + xb) / 2);
        var ys = A.concat(B).map(function (b) { return R(b.cy); });
        A.forEach(function (a) { wire('M' + R(a.r) + ' ' + R(a.cy) + 'H' + xm); });
        B.forEach(function (b) { wire('M' + xm + ' ' + R(b.cy) + 'H' + (xb - 1)); head(xb - 1, R(b.cy), 'r'); });
        wire('M' + xm + ' ' + Math.min.apply(null, ys) + 'V' + Math.max.apply(null, ys));
        B.forEach(function (b, j) { var a = A[j % A.length]; beam(elbow(R(a.r), R(a.cy), xm, xb - 1, R(b.cy)), 'pipe', c); });
      }
      /* agents <-> stack: two one-way lanes */
      var vx = R(ag.cx), y1 = R(ag.b) + 2, y2 = R(md.y) - 2;
      wire('M' + (vx - 7) + ' ' + y1 + 'V' + y2); head(vx - 7, y2, 'd'); beam('M' + (vx - 7) + ' ' + y1 + 'V' + y2, 'v-down', 0);
      wire('M' + (vx + 7) + ' ' + y2 + 'V' + y1); head(vx + 7, y1, 'u'); beam('M' + (vx + 7) + ' ' + y2 + 'V' + y1, 'v-up', 0);
      /* agents <-> agent infra */
      var hy = R(ag.cy), x1 = R(ag.r) + 2, x2 = R(inf.x) - 2;
      wire('M' + x1 + ' ' + (hy - 7) + 'H' + x2); head(x2, hy - 7, 'r'); beam('M' + x1 + ' ' + (hy - 7) + 'H' + x2, 'h-out', 0);
      wire('M' + x2 + ' ' + (hy + 7) + 'H' + x1); head(x1, hy + 7, 'l'); beam('M' + x2 + ' ' + (hy + 7) + 'H' + x1, 'h-in', 0);
      /* governance runs under the whole stack: a signal travels along its rule */
      var gov = at($('.arch-gov', arch));
      beam('M' + R(gov.x) + ' ' + R(gov.y) + 'H' + R(gov.r), 'gov', 0, true);
      arch.classList.add('has-wires');
    }
    var order = ['agents', 'context', 'data', 'gov'], k = -1, timer = null, live = false, held = false;
    function focus(g, auto) {
      if (g) arch.setAttribute('data-focus', g); else arch.removeAttribute('data-focus');
      arch.classList.toggle('is-cycling', !!(g && auto));
    }
    function tick() { k = (k + 1) % order.length; focus(order[k], true); }
    function start() { if (reduce || timer || held || !live) return; tick(); timer = setInterval(tick, 3200); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function hold(g) { held = true; stop(); focus(g, false); }
    function release() { held = false; focus(null); k = -1; setTimeout(start, 600); }
    $$('.arch-clause, .arch-box', arch).forEach(function (n) {
      var g = (n.getAttribute('data-g') || '').split(' ')[0]; if (!g) return;
      n.addEventListener('mouseenter', function () { hold(g); });
      n.addEventListener('focus', function () { hold(g); });
      n.addEventListener('blur', release);
    });
    arch.addEventListener('mouseleave', release);
    draw();
    if ('ResizeObserver' in window) { var rt; new ResizeObserver(function () { clearTimeout(rt); rt = setTimeout(draw, 80); }).observe(grid); }
    else window.addEventListener('resize', draw);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(draw);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        live = es[0].isIntersecting;
        if (live) { if (!arch.classList.contains('is-built')) { arch.classList.add('is-built'); setTimeout(start, 1500); } else start(); }
        else { stop(); if (!held) focus(null); }
      }, { threshold: 0.35 }).observe(arch);
    } else arch.classList.add('is-built');
  })();

  /* reveal on scroll: only elements that start below the fold, once */
  if (!reduce && 'IntersectionObserver' in window) {
    var groups = ['.section-heading', '.section-heading-row', '.event-card', '.arch', '.cfp-banner', '.topic-grid > *', '.founder-grid > *', '.tool-grid > *', '.article-list > *', '.stat-row > div', '.faq-item', '.agenda-item', '.footer-action-card', '.embed-shell', '.subscribe-card', '.empty-note'];
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    var vh = window.innerHeight;
    groups.forEach(function (sel) {
      $$(sel).forEach(function (el) {
        if (el.getBoundingClientRect().top < vh) return;
        var sibs = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        el.style.setProperty('--d', String(Math.min(sibs % 3, 3)));
        el.classList.add('reveal'); io.observe(el);
      });
    });
  }
})();
