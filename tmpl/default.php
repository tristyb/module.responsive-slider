<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

 defined('_JEXEC') or die;

?>

<div
	class="resp-slider  glide  js-resp-slider"
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

	<?php if ($params->get('direction_nav') === 'true') { ?>
		<div class="resp-slider__arrows glide__arrows" data-glide-el="controls">
			<button class="resp-slider__arrow glide__arrow" data-glide-dir="<">prev</button>
			<button class="resp-slider__arrow resp-slider__arrow--next glide__arrow" data-glide-dir=">">next</button>
		</div>
	<?php } ?>

	<?php if ($params->get('control_nav') === 'true') { ?>
		<div class="resp-slider__dots" data-glide-el="controls[nav]">
			<?php for($i = 0; $i < $slidesCount; $i++){ ?>
				<button class="resp-slider__dot" data-glide-dir="=<?php echo $i; ?>"><?php echo $i; ?></button>
			<?php } ?>
		</div>
	<?php } ?>
</div>
