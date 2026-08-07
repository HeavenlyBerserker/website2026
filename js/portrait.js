(function () {
  var img = document.getElementById('home-portrait');
  var text = document.querySelector('.background-text');
  if (!img || !text) return;

  function applySize(textH) {
    var maxW = window.innerWidth * 0.9;
    var aspect = img.naturalWidth / img.naturalHeight;
    var widthFromHeight = textH * aspect;

    // Whichever is smaller: height-matched to background text, or 90vw wide
    if (widthFromHeight <= maxW) {
      img.style.height = Math.round(textH) + 'px';
      img.style.width = 'auto';
    } else {
      img.style.width = Math.round(maxW) + 'px';
      img.style.height = 'auto';
    }
  }

  function sizePortrait() {
    if (!img.naturalWidth) return;

    // Measure background text at full width first
    img.style.width = '0';
    img.style.height = '0';
    var textH = text.offsetHeight;
    applySize(textH);

    // Refine once text reflows beside/above the sized image
    requestAnimationFrame(function () {
      applySize(text.offsetHeight);
    });
  }

  if (img.complete) sizePortrait();
  else img.addEventListener('load', sizePortrait);

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(sizePortrait, 100);
  });
})();
