// Karuzela oferty + przełącznik opinii (skórka beż + grafit, 08.10.2026)
(function () {
  document.querySelectorAll('[data-k-car]').forEach(function (car) {
    var track = car.querySelector('.k-track'), bar = car.querySelector('.k-prog i');
    function krok() { var s = track.querySelector('.k-slide'); return s ? s.getBoundingClientRect().width + 48 : 300; }
    function upd() {
      if (!bar) return;
      var max = track.scrollWidth - track.clientWidth, w = track.clientWidth / track.scrollWidth * 100;
      bar.style.width = w + '%';
      bar.style.left = (max > 0 ? track.scrollLeft / max * (100 - w) : 0) + '%';
    }
    car.querySelector('[data-k-next]').addEventListener('click', function () { track.scrollBy({ left: krok(), behavior: 'smooth' }); });
    car.querySelector('[data-k-prev]').addEventListener('click', function () { track.scrollBy({ left: -krok(), behavior: 'smooth' }); });
    track.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  });
  document.querySelectorAll('[data-k-rev]').forEach(function (rev) {
    var q = rev.querySelectorAll('.k-quote'), i = 0;
    function pokaz(n) { q[i].classList.remove('on'); i = (n + q.length) % q.length; q[i].classList.add('on'); }
    rev.querySelector('[data-k-rnext]').addEventListener('click', function () { pokaz(i + 1); });
    rev.querySelector('[data-k-rprev]').addEventListener('click', function () { pokaz(i - 1); });
  });
})();

// Stojące tło (stopklatka) jest position:fixed na cały ekran - poza swoją sekcją chowamy je,
// żeby nie leżało niewidzialnie nad hero (i nie myliło pomiaru zasłaniania pierwszego ekranu).
(function () {
  var sek = document.querySelector('.k-stk'), bg = sek && sek.querySelector('.stk-bg');
  if (!bg || !('IntersectionObserver' in window)) return;
  bg.style.visibility = 'hidden';
  new IntersectionObserver(function (e) {
    bg.style.visibility = e[0].isIntersecting ? 'visible' : 'hidden';
  }, { rootMargin: '200px 0px' }).observe(sek);
})();
