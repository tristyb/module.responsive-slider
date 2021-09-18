<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

 defined('_JEXEC') or die;

?>

<div
	class="resp-slider  splide  js-resp-slider"
	data-keyboard-navigation="<?php echo $params->get('keyboard'); ?>"
	data-reverse="<?php echo $params->get('animation_reverse'); ?>"
	data-loop="<?php echo $params->get('animation_loop'); ?>"
	data-animation-ms="<?php echo $params->get('animation_speed'); ?>"
	data-autoplay-ms="<?php echo $params->get('autoplay_speed'); ?>"
	data-dots="<?php echo $params->get('control_nav'); ?>"
	data-arrows="<?php echo $params->get('direction_nav'); ?>"
>
  <div class="resp-slider__track  splide__track">
    <ul class="resp-slider__slides  splide__list">
			<?php
				echo $slides;
			?>
		</ul>
	</div>
</div>
