<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

 defined('_JEXEC') or die;

?>

<div class="resp-slider  glide">
  <div class="resp-slider__track  glide__track" data-glide-el="track">
    <ul class="resp-slider__slides  glide__slides">
			<?php
				echo $slides;
			?>
		</ul>
	</div>
</div>
