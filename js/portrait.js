(function () {
  var img = document.getElementById('home-portrait');
  var text = document.querySelector('.background-text');
  if (!img || !text) return;

  var mobileQuery = window.matchMedia('(max-width: 768px)');

  function clearInlineSize() {
    img.style.width = '';
    img.style.height = '';
  }

  function sizeForDesktop() {
    if (!img.naturalWidth) return;

    // Collapse image to measure full-width text height
    img.style.width = '0';
    img.style.height = '0';
    img.style.visibility = 'hidden';

    var textH = text.offsetHeight;
    var maxW = Math.min(window.innerWidth * 0.9, text.parentElement.clientWidth * 0.45);
    var aspect = img.naturalWidth / img.naturalHeight;
    var widthFromHeight = textH * aspect;

    img.style.visibility = '';

    if (widthFromHeight <= maxW) {
      img.style.height = Math.round(textH) + 'px';
      img.style.width = 'auto';
    } else {
      img.style.width = Math.round(maxW) + 'px';
      img.style.height = 'auto';
    }

    // One refine after text reflows beside the image
    requestAnimationFrame(function () {
      if (mobileQuery.matches) return;
      var refinedH = text.offsetHeight;
      var refinedW = refinedH * aspect;
      if (refinedW <= maxW) {
        img.style.height = Math.round(refinedH) + 'px';
        img.style.width = 'auto';
      }
    });
  }

  function sizePortrait() {
    if (mobileQuery.matches) {
      // Mobile: CSS handles 90% width + centering
      clearInlineSize();
      return;
    }
    sizeForDesktop();
  }

  function start() {
    var run = function () {
      sizePortrait();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    // Re-run after image decode (Chrome can report size early)
    if (img.decode) {
      img.decode().then(run).catch(function () {});
    }
  }

  if (img.complete && img.naturalWidth) start();
  else img.addEventListener('load', start);

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(sizePortrait, 100);
  });

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', sizePortrait);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(sizePortrait);
  }
})();
