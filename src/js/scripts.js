import Splide from '@splidejs/splide';
import Transition from './transition';

// Slider init function.
function setupSlider() {
	const sliders = Array.from(document.querySelectorAll('.js-resp-slider'));

	sliders.forEach(slider => {
		// Elements
		const slideList = slider.querySelector('.splide__list');

		// Options
		const keyboardNav = slider.dataset.keyboardNavigation;
		const reverse = slider.dataset.reverse;
		const loop = slider.dataset.loop;
		const animationDuration = slider.dataset.animationMs;
		const autoplaySpeed = slider.dataset.autoplayMs;
		const dots = slider.dataset.dots;
		const arrows = slider.dataset.arrows;

		// Splide configuration.
		const splide = new Splide(slider, {
			type: loop === 'true' ? 'loop' : 'slide',
			keyboard: keyboardNav === 'true' ? true : false,
			direction: reverse === 'true' ? 'rtl' : 'ltr',
			speed: animationDuration > 100 ? animationDuration : 100,
			autoplay: autoplaySpeed === '0' ? false : true,
			interval: autoplaySpeed > '100' ? autoplaySpeed : 100,
			pauseOnHover: true,
			pagination: dots === 'true' ? true : false,
			arrows: arrows === 'true' ? true : false,
		});

		splide.on('mounted', () => {
			const firstImg = slider.querySelector('#splide01-slide01 > img').getBoundingClientRect();
			const firstImgHeight = `${Math.ceil(firstImg.height)}px`;
			slideList.style.height = firstImgHeight;
		});

		splide.mount({}, Transition);

		splide.on('move', (newIndex, oldIndex, destIndex) => {
			let nextIndex;

			if (newIndex === 0) {
				nextIndex = '01';
			} else if (newIndex <= 10) {
				nextIndex = `0${newIndex + 1}`;
			} else {
				nextIndex = newIndex;
			}

			const nextImg = slider.querySelector(`#splide01-slide${nextIndex} > img`).getBoundingClientRect();
			const nextImgHeight = `${Math.ceil(nextImg.height)}px`;

			setTimeout(() => {
				slideList.style.height = nextImgHeight;
			}, 10);
		});
	});
}

window.onload = function () {
	setupSlider();
};
