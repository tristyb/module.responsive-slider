<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

class mod_tristans_responsive_slider{
	public static function getSlides($params){
		$slides = json_decode(json_encode($params->get("slides_repeater")), true);
		$amount_of_slides = count($slides);
		$html = "";

		// slide_image, slide_alt, slide_caption
		if(is_array($slides) && !empty($slides)):

			foreach($slides as $slideKey => $slide):
				$alt = "";
				$caption = "";

				if($slide['slide_alt'] !== ""):
					$alt = $slide['slide_alt'];
				endif;

				if($slide['slide_caption'] !== ""):
					$caption = $slide['slide_caption'];
				endif;

				$html.= '<li class="resp-slider__slide  glide__slide">';
				$html.= '<img src="'.$slide['slide_image'].'" alt="'.$alt.'">';

				if($caption !== ""):
					$html.= '<p class="resp-slider__caption">'.$caption.'</p>';
				endif;

				$html.= '</li>';
			endforeach;
		endif;

		return $html;
	}
}
