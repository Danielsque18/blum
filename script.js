// BLUM: видео (лёгкие на телефоне, играют только на экране), подбор метода, шторка до/после, отзывы, статус «открыто» (Липецк, UTC+3).
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* видео */
  var slim = matchMedia('(max-width: 1080px)').matches;
  var save = (navigator.connection && navigator.connection.saveData) || matchMedia('(prefers-reduced-data: reduce)').matches;
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vids = [].slice.call(document.querySelectorAll('video.vid'));
  vids.forEach(function (v) { v.addEventListener('playing', function () { v.classList.add('on'); }); });
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src && !save && !calm) v.src = (slim && v.dataset.srcM) || v.dataset.src;
          if (v.src) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        } else if (v.src) v.pause();
      });
    }, { rootMargin: '150px 0px' });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* шапка */
  var demo = $('.demo-bar'), top = $('#top');
  function head() { var h = demo ? demo.offsetHeight : 0, y = scrollY; top.style.top = Math.max(0, h - y) + 'px'; top.classList.toggle('solid', y > h + 40); }
  addEventListener('scroll', head, { passive: true }); addEventListener('resize', head); head();
  var burger = $('.burger');
  burger.addEventListener('click', function () { var o = top.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  top.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { top.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  /* подбор метода — по описанию методов студии */
  var RES = {
    laser: 'Вам подойдёт <b>лазерная эпиляция</b> — долгосрочное решение, а ещё избавляет от вросших волос.',
    electro: 'Вам подойдёт <b>электроэпиляция</b> — она справляется со светлыми и тонкими волосами, которые трудно удалить лазером.',
    both: 'Не страшно: мастер посмотрит кожу и волосы и подберёт метод, который даст результат именно вам.'
  };
  document.querySelectorAll('.pick-btns button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.pick-btns button').forEach(function (x) { x.setAttribute('aria-checked', x === b); });
      var m = b.dataset.m; $('#pickRes').innerHTML = RES[m];
      $('#m-laser').classList.toggle('hl', m === 'laser'); $('#m-electro').classList.toggle('hl', m === 'electro');
    });
  });

  /* шторка до/после */
  var ba = $('#ba'), range = $('.ba-range', ba);
  range.addEventListener('input', function () { ba.style.setProperty('--x', range.value + '%'); });

  /* отзывы — дословно с Яндекс Карт, длинные сокращены «…» */
  var R = [
    ['София Пикалина', 'май 2026', 'Очень понравилось! Студия светлая и уютная -заходишь и сразу расслабляешься. Главное, что порадовало: суперчисто везде, за этим следят очень строго, никаких сомнений по поводу гигиены. Идеально!\nЛазер с охлаждением -это отдельное спасибо. Процедура комфортная, почти не ощущается, а после сеанса никакого раздражения.'],
    ['Елена Г.', 'декабрь 2025', 'Мне так понравилось!\n\nВсё продумано до мелочей: место для сумочки, для одежды, чтобы она не помялась, одноразовые носочки, ступеньки у кушетки, большой выбор чая в зоне ожидания. Подушка! Самая удобная подушка из всех бьюти-студий, где я бывала. …'],
    ['Лиана Коротаева', 'май 2026', 'Сегодня наконец-то дошла до лазерной эпиляции и это был лучший выбор. Честно говоря, немного переживала, но всё прошло максимально быстро и — самое главное — абсолютно безболезненно! 😍\nХочу сказать отдельное спасибо мастеру Яне. У неё в кабинете чувствуешь себя очень комфортно: всё идеально стерильно, уютная атмосфера и очень внимательный подход.'],
    ['Святомира Славянова', 'май 2026', 'Вчера была на электроэпиляции в студии BLUM. В помещении стильно, чисто и очень приятно находиться. Сотрудники просто душечки! Час пролетел незаметно, больно не было. Сегодня второй день и никаких проблем на коже нет, моя большая благодарность! 🥹✨'],
    ['Анна Петухова', 'ноябрь 2025', 'Хожу в эту студию уже несколько сеансов и каждый раз понимаю, что выбрала её правильно🤍✨ Здесь гораздо комфортнее, чем в других местах: красиво, светло, уютно и очень стерильно — сразу чувствуешь себя спокойно. … Отдельно отмечу мастера Яну: её медицинское образование даёт уверенность, и работает она очень аккуратно.'],
    ['Надежда Кулешова', 'июнь 2025', 'Долго думала о том что бы сделать лазерную эпиляцию зоны глубокого бикини, но как то было "неудобно, стыдно😔", а тут получила приглашение и думаю судьба, пойду. … встретили превосходно и сама не заметила как прошла процедура, куда-то делся страх и стеснение. Сама процедура прошла абсолютно безболезненно.'],
    ['Ирина Н.', 'декабрь 2025', 'Сегодня я была первый раз на лазерной эпиляции подмышечных впадин. Процедура понравилась. Практически не больно, очень быстро. Эпиляция происходит без геля. В студии комфортно, уютно, чисто. Мастер вежливо  ответил на все мои вопросы. Буду продолжать курс эпиляции.'],
    ['Ольга Бражникова', 'декабрь 2025', 'Отличный мастер Яна, внимательная, вежливая, знает свое дело четко 👌. Раньше ходила часто, сейчас раз в полгода на поддерживающие процедуры! Маму тоже подтянула на это дело 😊. Как мы раньше жили без лазерной эпиляции 🙈Шугаринги, воск, электрический эпилятор, бритва... О ужас, 7 кругов ада 🤦‍♀️.'],
    ['Татьяна Горелова', 'август 2026', 'Отличное расположение - в центре, студия очень комфортная и уютная, девочки приветливые и внимательные!!! С первых минут чувствуешь себя как дома!\nОтдельно хочется сказать про саму процедуру - в кабинете все чисто, расходники меняются вовремя. Эффективность заметна уже после первого посещения, это говорит о качестве аппарата. Рекомендую 👍'],
    ['Карина Баласанян', 'сентябрь 2025', 'К Яне хожу уже давно, результатом довольна😍 \nНе мучаю себя бритвами, нету раздражения и вросших волос. Яна профессионал своего дела, делает все очень аккуратно.'],
    ['Александра Кирьянова', 'май 2026', 'В студии очень комфортные условия💙🤌🏻\nМастер прекрасно и безболезненно выполнил процедуру, объяснил что можно, а что нельзя после лазерной эпиляции, дал советы по уходу)\nЕсли вы ищите отличную клиентоориентированность, то вам в BLUM💙'],
    ['Kat И.', 'февраль 2025', 'Яна чудесный мастер. Хожу к ней больше двух лет. Всегда ответит на вопросы, подскажет, что мне было непонятно, порекомендует косметические средства. Очень аккуратно делает процедуры (лазерную эпиляцию). Адекватно указывает необходимые сроки повторных процедур.']
  ];
  var star = '<svg><use href="#i-star"/></svg>';
  $('#revs').innerHTML = R.map(function (r) {
    return '<article class="rev"><span class="stars">' + star + star + star + star + star + '</span><span class="q" aria-hidden="true"></span><p>' + esc(r[2]) + '</p><footer><span><b>' + esc(r[0]) + '</b><small>' + r[1] + ' · Яндекс Карты</small></span></footer></article>';
  }).join('');
  document.querySelectorAll('.rn').forEach(function (b) {
    b.addEventListener('click', function () { var t = $('#revs'); t.scrollBy({ left: (+b.dataset.d) * Math.min(420, t.clientWidth * .85), behavior: 'smooth' }); });
  });

  /* открыто ли сейчас: Липецк UTC+3, ежедневно 09:00–20:00 */
  function tick() {
    var d = new Date(Date.now() + (180 + new Date().getTimezoneOffset()) * 60000), m = d.getHours() * 60 + d.getMinutes();
    var open = m >= 540 && m < 1200;
    var t = open ? 'Сейчас открыто, до 20:00' : (m < 540 ? 'Откроемся сегодня в 09:00' : 'Откроемся завтра в 09:00');
    $('#open').textContent = t; $('#dot').classList.toggle('is-open', open); $('#open2').textContent = t + ' · без выходных';
  }
  tick(); setInterval(tick, 60000);

  /* появление при прокрутке */
  if ('IntersectionObserver' in window && !calm) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });
  } else document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  setTimeout(function () { document.querySelectorAll('.rv').forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }); }, 2000);

  /* нижняя кнопка на телефоне */
  var fab = $('.fab'), vis = {};
  var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { vis[e.target.id] = e.isIntersecting; }); fab.classList.toggle('off', !!(vis.hero || vis.contacts)); }, { threshold: .1 });
  ['hero', 'contacts'].forEach(function (id) { io2.observe(document.getElementById(id)); });
})();
