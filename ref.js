// Ambassador referral capture (Ken, 11/3/2026 · auto-tracking step 3).
// An ambassador's link (?ref=<their slug>) is remembered in this browser for 90 days; the first
// ambassador wins. It's added to every link that can turn into a sale:
//   - GHL booking pages: ref + utm_* on the URL, which GHL saves on the contact. An hourly job then
//     tags the contact amb-<slug> and credits the ambassador on everything they pay for.
//   - signaturebranding.app and signatureagentos.com: ?ref=, which those checkouts already credit.
// Links are rewritten on load and again on click, so buttons built later (assessment results) count.
(function () {
  var KEY = 'sig_ref', DAYS = 90;

  function clean(v) { return String(v || '').trim().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64); }

  function read() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && s.ref && Date.now() - s.at < DAYS * 864e5) return s.ref;
    } catch (e) {}
    return '';
  }

  var ref = read();
  var fromUrl = clean(new URLSearchParams(location.search).get('ref'));
  if (!ref && fromUrl) {
    ref = fromUrl;
    try { localStorage.setItem(KEY, JSON.stringify({ ref: ref, at: Date.now() })); } catch (e) {}
  }
  if (!ref) ref = fromUrl; // storage blocked: still carry it on this page

  function decorate(href) {
    if (!ref || !href) return href;
    var u;
    try { u = new URL(href, location.href); } catch (e) { return href; }
    var h = u.hostname.replace(/^www\./, '');
    if (h === 'api.leadconnectorhq.com' && u.pathname.indexOf('/widget/bookings/') === 0) {
      if (u.searchParams.get('ref')) return href;
      u.searchParams.set('ref', ref);
      u.searchParams.set('utm_source', 'ambassador');
      u.searchParams.set('utm_medium', 'referral');
      u.searchParams.set('utm_campaign', 'amb-' + ref);
    } else if (h === 'signaturebranding.app' || h === 'signatureagentos.com') {
      if (u.searchParams.get('ref')) return href;
      u.searchParams.set('ref', ref);
    } else {
      return href;
    }
    return u.toString();
  }

  function decorateAll() {
    if (!ref) return;
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i], next = decorate(a.getAttribute('href'));
      if (next !== a.getAttribute('href')) a.setAttribute('href', next);
    }
  }

  window.sigRef = function () { return ref; };
  window.sigDecorate = decorate;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorateAll);
  else decorateAll();
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (a) { var next = decorate(a.getAttribute('href')); if (next !== a.getAttribute('href')) a.setAttribute('href', next); }
  }, true);
})();
