<?php
/*
Plugin Name: Formulario SIGE
Description: Integra el formulario del SIGE en la web
Version: 1.0.0
*/

require_once 'widget_sige_class.php';

if(!function_exists('widget_sige'))
{
	function widget_sige()
	{
		register_widget('widget_sige_class');
	}
}

add_action('widgets_init', 'widget_sige');
