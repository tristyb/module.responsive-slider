<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;
JHtml::_('jquery.framework');

// Include the class of the helper
require_once(dirname(__FILE__).'/helper.php');

// Call the class for slides
$slides = mod_tristans_responsive_slider::getSlides($params);

// Add CSS
$document = JFactory::getDocument();
$document->addStyleSheet(JURI::base(true).'/modules/mod_tristans_responsive_slider/build/style.css', 'text/css');

$document->addStyleDeclaration($params->get('customCSS'));

// Add scripts
$document->addScript(JURI::base(true).'/modules/mod_tristans_responsive_slider/build/scripts.min.js');

// Add inline scripts
$document->addScriptDeclaration('
	jQuery(window).load(function() {
		jQuery(".flexslider").flexslider({
			animation: "'.$params->get('animation_type').'",
			direction: "'.$params->get('animation_direction').'",
			reverse: '.$params->get('animation_reverse').',
			animationLoop: '.$params->get('animation_loop').',
			smoothHeight: '.$params->get('smooth_height').',
			slideshowSpeed: "'.$params->get('slideshow_speed').'",
			animationSpeed: "'.$params->get('animation_speed').'",
			randomize: '.$params->get('randomize').',
			pauseOnHover: '.$params->get('pause_on_hover').',
			controlNav: '.$params->get('control_nav').',
			directionNav: '.$params->get('direction_nav').',
			keyboard: '.$params->get('keyboard').'
		});
	});
');

//keeps class suffix
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));

require(JModuleHelper::getLayoutPath('mod_tristans_responsive_slider'));;
