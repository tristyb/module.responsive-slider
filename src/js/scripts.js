import Glide, { Controls, Swipe, Keyboard, Autoplay } from '@glidejs/glide/dist/glide.modular.esm'
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
			const activeSlide = document.querySelector(
				selectors.glideSlideNextActive
			);
			const activeSlideHeight = activeSlide ? activeSlide.offsetHeight : 0;
			const glideTrack = document.querySelector(selectors.glideTrack);

			glideTrack.style.height = `${activeSlideHeight}px`;
		},
	};

	Events.on('run', () => {
		Component.changeActiveSlide();
		Component.updateTrackHeight();
	});

	return Component;
};

// Slider init function.
function setupSlider() {

	const sliders = Array.from(document.querySelectorAll('.js-resp-slider'));

	sliders.forEach(slider => {
		const keyboardNav = slider.dataset.keyboardNavigation;
		const reverse = slider.dataset.reverse;
		const loop = slider.dataset.loop;
		const animationDuration = slider.dataset.animationMs;
		const autoplaySpeed = slider.dataset.autoplayMs;

		const glide = new Glide(slider, {
			type: loop === 'true' ? 'carousel' : 'slider',
			keyboard: keyboardNav === 'true' ? true : false,
			direction: reverse === 'true' ? 'rtl' : 'ltr',
			animationDuration,
			autoplay: autoplaySpeed === '0' ? false : autoplaySpeed,
			hoverpause: true
		}).mount({ Controls, Swipe, Keyboard, ResizeSlider, Autoplay });
	});
}

window.onload = function () {
	setupSlider();
};
