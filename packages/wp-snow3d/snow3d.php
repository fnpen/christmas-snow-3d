<?php
/*
    Plugin Name: Chrismas Snow 3D
*/

namespace ChrismasSnow3d;

/**
 * Includes asset.
 * 
 * @return void 
 */
function wp_enqueue_scripts()
{
    $script_asset_path = __DIR__ . "/build/snow3d.asset.php";
    if (file_exists($script_asset_path) ) {
        $script_asset = include $script_asset_path;   
        wp_enqueue_script('christmas-snow-3d', plugins_url('build/snow3d.js', __FILE__), [], $script_asset['version']);
    }
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\wp_enqueue_scripts');

function add_async_attribute($tag, $handle) {
    if ('christmas-snow-3d' === $handle) {
        return str_replace( '<script ', '<script async ', $tag );
    }

    return $tag;
}
add_filter('script_loader_tag', __NAMESPACE__ . '\\add_async_attribute', 10, 2);
