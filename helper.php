<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

class mod_tristans_responsive_slider
{
	public static function getSlides($params)
	{
		$slides = json_decode(json_encode($params->get("slides_repeater")), true);
		$html = "";

		if(is_array($slides) && !empty($slides)) {
			if($params->get('randomize') === "true") {
				shuffle($slides);
			}

			foreach($slides as $slideKey => $slide) {
				$alt = "";
				$caption = "";

				if($slide['slide_alt'] !== "") {
					$alt = $slide['slide_alt'];
				}

				if($slide['slide_caption'] !== "") {
					$caption = $slide['slide_caption'];
				}

				$html.= '<li class="resp-slider__slide  glide__slide">';
				$html.= '<img class="resp-slider__image" src="'.$slide['slide_image'].'" alt="'.$alt.'">';

				if($caption !== "") {
					$html.= '<p class="resp-slider__caption">'.$caption.'</p>';
				}

				$html.= '</li>';
			}
		}

		return $html;
	}

	public static function getSlidesCount($params)
	{
		return count(json_decode(json_encode($params->get("slides_repeater")), true));
	}
}
