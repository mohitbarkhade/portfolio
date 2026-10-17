/* ===========================================================
   Mohit Barkhade — Portfolio behaviour
   - Skills filter grid
   - Scroll-spy nav highlighting
   - Back-to-top button
   - Contact form (mailto composer, no backend required)
   =========================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------
     1) Skills filter grid
     ------------------------------------------------------- */
  var CATS = [
    { id: 'all',   label: 'All' },
    { id: 'test',  label: 'Testing' },
    { id: 'dev',   label: 'Development' },
    { id: 'infra', label: 'Infrastructure' },
    { id: 'work',  label: 'Domain & work' }
  ];

  var GROUPS = [
    { cat: 'test',  title: 'Testing & QA',               blurb: 'Planning, designing and running tests that catch problems early.', items: ['Test automation', 'UI automation', 'API testing', 'End-to-end testing', 'Functional & system testing', 'Regression testing', 'Integration testing', 'Performance testing', 'Cross-browser testing', 'Test case design', 'Release validation', 'Root-cause analysis'] },
    { cat: 'test',  title: 'Automation frameworks',      blurb: 'Frameworks and tools I use to build reliable automated suites.', items: ['Playwright', 'Selenium WebDriver', 'TestNG', 'Cucumber (BDD)', 'Data-driven (DDT)', 'Page Object Model', 'AutoIT', 'Postman'] },
    { cat: 'dev',   title: 'Languages & scripting',      blurb: 'Languages I write tests, scripts and small tools in.', items: ['Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Bash / Shell scripting', 'JSON', 'YAML'] },
    { cat: 'dev',   title: 'APIs & integration',         blurb: 'Testing how services talk to each other.', items: ['REST APIs', 'cURL', 'JSON payloads', 'Webhooks', 'Cron jobs', 'RabbitMQ / AMQP', 'Redis', 'MQTT (Mosquitto)'] },
    { cat: 'dev',   title: 'Databases',                  blurb: 'Querying and validating the data behind every flow.', items: ['SQL', 'PostgreSQL', 'MySQL', 'PL/SQL', 'PostgREST', 'DBeaver'] },
    { cat: 'infra', title: 'DevOps & servers',           blurb: 'Setting up, running and fixing the environments tests depend on.', items: ['Docker', 'Docker Compose', 'Podman', 'Ansible', 'V4 server installation (manual & Ansible)', 'Jenkins CI/CD', 'Git / GitHub / GitLab', 'Container logs & diagnostics'] },
    { cat: 'infra', title: 'OS & remote access',         blurb: 'Comfortable across operating systems and remote machines.', items: ['Ubuntu / Linux', 'Windows', 'macOS', 'Terminal', 'CMD', 'PowerShell', 'PuTTY / SSH', 'Virtual machines', 'Remote Desktop'] },
    { cat: 'work',  title: 'Robotics & warehouse domain', blurb: 'Knowing how a robotic sortation system should behave.', items: ['Robotic sortation', 'ECS / CBS validation', 'Robot load & unload events', 'Bin & chute state transitions', 'Refeed, reroute & rejection flows', 'Post-activation testing', 'AS400'] },
    { cat: 'work',  title: 'Tools & ways of working',    blurb: 'How I plan, track and share work with the team.', items: ['JIRA', 'ServiceNow', 'SDLC & STLC', 'Agile / Scrum', 'Code review', 'Documentation', 'Knowledge transfer', 'Status reporting'] }
  ];

  var current = 'all';
  var ON  = 'min-height:44px;padding:0 18px;border-radius:999px;border:2px solid #0E0F0C;background:#0E0F0C;color:#C8F169;font-family:Manrope,sans-serif;font-size:15px;font-weight:700;cursor:pointer';
  var OFF = 'min-height:44px;padding:0 18px;border-radius:999px;border:2px solid #0E0F0C;background:transparent;color:#0E0F0C;font-family:Manrope,sans-serif;font-size:15px;font-weight:600;cursor:pointer';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function renderSkills() {
    var f = document.getElementById('skill-filters');
    if (!f) return;
    f.innerHTML = '';
    CATS.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mb-chip';
      b.textContent = c.label;
      b.setAttribute('aria-pressed', c.id === current ? 'true' : 'false');
      b.style.cssText = c.id === current ? ON : OFF;
      b.onclick = function () { current = c.id; renderSkills(); };
      f.appendChild(b);
    });

    var g = document.getElementById('skill-groups');
    g.innerHTML = GROUPS
      .map(function (x, i) { return Object.assign({ num: String(i + 1).padStart(2, '0') }, x); })
      .filter(function (x) { return current === 'all' || x.cat === current; })
      .map(function (x) {
        return '<article style="background:#FFFFFF;border:2px solid #0E0F0C;border-radius:24px;padding:28px;display:flex;flex-direction:column;gap:16px">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px">' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:12px;font-weight:600;background:#C8F169;border:2px solid #0E0F0C;border-radius:999px;padding:4px 12px">' + x.num + '</span>' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:12px;color:#555950">' + x.items.length + ' skills</span></div>' +
          '<h3 style="margin:0;font-family:Syne,sans-serif;font-weight:800;font-size:26px;line-height:1.1;letter-spacing:-0.01em">' + esc(x.title) + '</h3>' +
          '<p style="margin:0;font-size:15px;line-height:1.55;color:#44473F">' + esc(x.blurb) + '</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px">' +
          x.items.map(function (k) {
            return '<span style="border:1.5px solid #0E0F0C;border-radius:999px;padding:7px 14px;font-size:14px;font-weight:600;background:#F2F1EC">' + esc(k) + '</span>';
          }).join('') +
          '</div></article>';
      }).join('');
  }

  /* -------------------------------------------------------
     2) Scroll-spy — highlight the nav link for the section
        currently in view.
     ------------------------------------------------------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'));
    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { map[id] = link; sections.push(sec); }
    });
    if (!('IntersectionObserver' in window) || !sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          var active = map[entry.target.id];
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* -------------------------------------------------------
     3) Back-to-top button
     ------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById('mb-top');
    if (!btn) return;
    function onScroll() {
      if (window.pageYOffset > 600) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------------------------------------------------------
     4) Contact form — opens the visitor's mail client with a
        pre-filled message. No server required, works on any
        static host.
     ------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var note = document.getElementById('form-note');
    var TO = form.getAttribute('data-to') || '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || '').trim();
      var email = (form.elements.email.value || '').trim();
      var message = (form.elements.message.value || '').trim();

      if (!name || !email || !message) {
        setNote('Please fill in your name, email and a short message.', true);
        return;
      }

      var subject = 'Portfolio enquiry from ' + name;
      var body = message + '\n\n— ' + name + '\n' + email;
      var href = 'mailto:' + TO +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = href;
      setNote('Opening your email app… if nothing happens, write to ' + TO, false);
    });

    function setNote(msg, isError) {
      if (!note) return;
      note.textContent = msg;
      note.style.color = isError ? '#8A1C00' : '#2E3A10';
    }
  }

  /* -------------------------------------------------------
     Boot
     ------------------------------------------------------- */
  function init() {
    renderSkills();
    initScrollSpy();
    initBackToTop();
    initContactForm();
    var yearEl = document.getElementById('mb-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
