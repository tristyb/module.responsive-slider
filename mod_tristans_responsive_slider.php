<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

// Include the class of the helper
require_once(dirname(__FILE__).'/helper.php');

// Call the class for slides
$slides = mod_tristans_responsive_slider::getSlides($params);
$slidesCount = mod_tristans_responsive_slider::getSlidesCount($params);

// Add CSS
$document = JFactory::getDocument();
$document->addStyleSheet(JURI::base(true).'/modules/mod_tristans_responsive_slider/build/mod_tristans_responsive_slider.min.css', 'text/css');

$document->addStyleDeclaration($params->get('customCSS'));

// Add scripts
$document->addScript(JURI::base(true).'/modules/mod_tristans_responsive_slider/build/mod_tristans_responsive_slider.min.js', array(), array('async'=>'async'));

//keeps class suffix
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));

require(JModuleHelper::getLayoutPath('mod_tristans_responsive_slider'));;
