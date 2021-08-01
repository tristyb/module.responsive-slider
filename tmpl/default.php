<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

 defined('_JEXEC') or die;

?>

<div
	class="resp-slider  glide  js-resp-slider"
	data-dot-navigation="<?php echo $params->get('control_nav'); ?>"
	data-arrow-navigation="<?php echo $params->get('direction_nav'); ?>"
	data-keyboard-navigation="<?php echo $params->get('keyboard'); ?>"
	data-reverse="<?php echo $params->get('animation_reverse'); ?>"
	data-loop="<?php echo $params->get('animation_loop'); ?>"
	data-animation-ms="<?php echo $params->get('animation_speed'); ?>"
>
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
