<?php
add_action('wp_enqueue_scripts', 'aa_scripts');
function aa_scripts(){
	if($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()){
		wp_enqueue_script('jquery');

		wp_enqueue_style('ns-google-font', 'https://fonts.googleapis.com/css?family=Satisfy|Bree+Serif|Candal|PT+Sans');

		wp_register_script('le-js', get_template_directory_uri().'/assets/js/custom.js', array('jquery'), '', true);
		wp_enqueue_script('le-js');
	}
}

function my_theme_enqueue_styles() {
    $parent_style = 'parent-style';
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-sass', get_stylesheet_directory_uri() . '/build/css/child-styles.css', array(), '1.0', 'all' );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

