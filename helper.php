<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

class mod_tristansResponsiveSlider{
	public static function getSlides($params){
		$slides = json_decode($params->get("slides"), true);
		$amount_of_slides = count($slides['slide_image']);
		$html = "";

		// slide_image, slide_alt, slide_caption
		if(is_array($slides) && !empty($slides)):

			for($i = 0; $i < $amount_of_slides; $i++):
				$alt = "";
				$caption = "";

				if($slides['slide_alt'][$i] !== ""):
					$alt = $slides['slide_alt'][$i];
				endif;

				if($slides['slide_caption'][$i] !== ""):
					$caption = $slides['slide_caption'][$i];
				endif;

				$html.= '<li>';
				$html.= '<img src="/images/mod_tristansResponsiveSlider/'.$slides['slide_image'][$i].'" alt="'.$alt.'">';

				if($caption !== ""):
					$html.= '<p class="flex-caption">'.$caption.'</p>';
				endif;

				$html.= '</li>';
			endfor;
		endif;

		return $html;
	}
}
