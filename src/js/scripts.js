import Glide, { Controls, Swipe } from '@glidejs/glide/dist/glide.modular.esm'
import { siblings } from '@glidejs/glide/src/utils/dom';

// https://github.com/glidejs/glide/issues/236#issuecomment-765090306
const classes = {
  glideSlideNextActive: 'glide__slide--next-active',
};

const selectors = {
  glideSlideNextActive: '.glide__slide--next-active',
  glideTrack: '.glide__track',
};

function ResizeSlider(Glide, Components, Events) {
  var Component = {
    mount() {
      this.changeActiveSlide();
      this.updateTrackHeight();
    },

    changeActiveSlide() {
      let slide = Components.Html.slides[Glide.index];
      slide.classList.add(classes.glideSlideNextActive);

      siblings(slide).forEach((sibling) => {
        sibling.classList.remove(classes.glideSlideNextActive);
      });
    },

    updateTrackHeight() {
      console.log('update track height');

      const activeSlide = document.querySelector(
        selectors.glideSlideNextActive
      );
      const activeSlideHeight = activeSlide ? activeSlide.offsetHeight : 0;

      const glideTrack = document.querySelector(selectors.glideTrack);
      const glideTrackHeight = glideTrack ? glideTrack.offsetHeight : 0;

      console.log(`Active slide: ${activeSlide} activeSlideHeight: ${activeSlideHeight}`)

      if (activeSlideHeight !== glideTrackHeight) {
        glideTrack.style.height = `${activeSlideHeight}px`;
      }
    },
  };

  Events.on('run', () => {
    Component.changeActiveSlide();
    Component.updateTrackHeight();
  });

  return Component;
};

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
    }).mount({ Controls, Swipe, ResizeSlider });
  });
}

window.onload = function () {
  setupSlider();
};
