<?php

/**
 * TRISTAN'S RESPONSIVE SLIDER
 * @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

class mod_tristans_responsive_sliderInstallerScript
{

	/**
	 * Constructor
	 *
	 * @param   JAdapterInstance  $adapter  The object responsible for running this script
	 */
	public function __construct(JAdapterInstance $adapter){}

	public function install(JAdapterInstance $adapter)
	{
		$path = JPATH_SITE . "/images/mod_tristansResponsiveSlider";
		JFolder::create($path, 0755);
  }
}
