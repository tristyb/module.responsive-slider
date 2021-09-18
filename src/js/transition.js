import { applyStyle } from '@splidejs/splide/src/js/utils/dom';
import { SLIDE } from "@splidejs/splide/src/js/constants/types";

export default (Splide, Components) => {
	let list;
	let endCallback;

	return {
		mount() {
			list = Components.Elements.list;

			Splide.on('transitionend', e => {
				if (e.target === list && endCallback) {
					endCallback();
				}
			}, list);
		},

		start(destIndex, newIndex, prevIndex, coord, done) {
			const options = Splide.options;
			const edgeIndex = Components.Controller.edgeIndex;
			let speed = options.speed;
			endCallback = done;

			if (Splide.is(SLIDE)) {
				if ((prevIndex === 0 && newIndex >= edgeIndex) || (prevIndex >= edgeIndex && newIndex === 0)) {
					speed = options.rewindSpeed || speed;
				}
			}

			applyStyle(list, {
				transition: `transform ${speed}ms ${options.easing}, height ${speed}ms ${options.easing}`,
				transform: `translate(${coord.x}px,${coord.y}px)`,
			});
		},
	};
}
