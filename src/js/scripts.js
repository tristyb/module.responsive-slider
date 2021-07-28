import Glide, { Controls, Swipe } from '@glidejs/glide/dist/glide.modular.esm'

// Equivilant to jQuery ready.
const ready = function (fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Slider init function.
function setupSlider() {
  const sliders = Array.from(document.querySelectorAll('.js-resp-slider'));

  sliders.forEach(slider => {
    const glide = new Glide(slider, {
      type: 'carousel',
    }).mount({ Controls, Swipe });
  });
}

ready(setupSlider);
