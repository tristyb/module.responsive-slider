<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

 defined('_JEXEC') or die;

?>

<div class="resp-slider  glide  js-resp-slider">
  <div class="resp-slider__track  glide__track" data-glide-el="track">
    <ul class="resp-slider__slides  glide__slides">
			<?php
				echo $slides;
			?>
		</ul>
	</div>

	<div class="resp-slider__arrows glide__arrows" data-glide-el="controls">
    <button class="resp-slider__arrow glide__arrow" data-glide-dir="<">prev</button>
    <button class="resp-slider__arrow resp-slider__arrow--next glide__arrow" data-glide-dir=">">next</button>
  </div>
</div>
