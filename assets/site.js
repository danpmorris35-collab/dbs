/* Positive Pathways — shared interaction layer. No dependencies, no
   third-party requests. One file, linked by every page. Each block checks
   for its own markup before doing anything, so this is safe to include
   even on pages that don't use a given component. */
(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- masthead mobile menu ---------------------------------------------- */
  var more = document.querySelector('.mast__more'), sheet = document.getElementById('sheet');
  if (more && sheet) {
    more.addEventListener('click', function(){
      var open = sheet.dataset.open !== 'true';
      sheet.dataset.open = open ? 'true' : 'false';
      more.setAttribute('aria-expanded', open ? 'true' : 'false');
      more.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', open);
    });
    sheet.addEventListener('click', function(e){ if (e.target.tagName === 'A') more.click(); });
  }

  /* ---- scroll reveals ------------------------------------------------------ */
  var watched = document.querySelectorAll('.door, .catalogue__item, .reveal');
  if (watched.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(watched, function(el){ el.classList.add('is-in'); });
    } else {
      var seen = 0;
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = (el.classList.contains('door') || el.classList.contains('catalogue__item')) ? Math.min(seen++, 9) * 50 : 0;
          setTimeout(function(){ el.classList.add('is-in'); }, delay);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      Array.prototype.forEach.call(watched, function(el){ io.observe(el); });
    }
  }

  /* ---- homepage: doors + the room modal ------------------------------------ */
  var doors = Array.prototype.slice.call(document.querySelectorAll('.door'));
  var room = document.getElementById('room');
  if (doors.length && room) {
    var closeBtn = room.querySelector('.room__close');
    var slot = {};
    ['said','name','explore','toward','when','href'].forEach(function(k){
      slot[k] = room.querySelector('[data-slot="' + k + '"]');
    });
    var current = -1, lastFocus = null;

    function fill(i){
      var d = doors[i];
      current = i;
      slot.said.textContent = d.querySelector('.door__said').textContent;
      slot.name.innerHTML = d.dataset.name;
      slot.explore.textContent = d.dataset.explore;
      slot.toward.textContent = d.dataset.toward;
      slot.when.textContent = d.dataset.when;
      slot.href.setAttribute('href', d.dataset.href);
      room.scrollTop = 0;
    }
    function open(i){
      lastFocus = document.activeElement;
      fill(i);
      room.dataset.open = 'true';
      document.body.classList.add('is-locked');
      closeBtn.focus();
    }
    function close(){
      room.dataset.open = 'false';
      document.body.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    }
    doors.forEach(function(d, i){ d.addEventListener('click', function(){ open(i); }); });
    closeBtn.addEventListener('click', close);
    room.querySelectorAll('[data-step]').forEach(function(b){
      b.addEventListener('click', function(){
        var next = (current + parseInt(b.dataset.step, 10) + doors.length) % doors.length;
        fill(next);
      });
    });
    document.addEventListener('keydown', function(e){
      if (room.dataset.open !== 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') room.querySelector('[data-step="1"]').click();
      if (e.key === 'ArrowLeft') room.querySelector('[data-step="-1"]').click();
      if (e.key === 'Tab'){
        var f = room.querySelectorAll('button, a[href]');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });

    var said = document.querySelector('[data-said]'), count = document.querySelector('[data-count]');
    if (said && count && doors.length && !reduced){
      var lines = doors.map(function(d){ return d.querySelector('.door__said').textContent; });
      var n = 0;
      setInterval(function(){
        said.classList.add('is-out');
        setTimeout(function(){
          n = (n + 1) % lines.length;
          said.textContent = lines[n];
          count.textContent = ('0' + (n + 1)).slice(-2) + ' / 10';
          said.classList.remove('is-out');
        }, 520);
      }, 6200);
    }
  }

  /* ---- contact form: no back end yet, so say so plainly --------------------- */
  var form = document.querySelector('[data-demo-form]');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = form.querySelector('[data-form-note]');
      if (note) {
        note.textContent = 'This form has no back end yet — for now, please email hello@positivepathways.co.uk directly and Sarah will reply personally.';
        note.classList.add('is-shown');
      }
    });
  }
})();
