<?php
/*
    Plugin Name: Chrismas Snow 3D
*/

namespace ChrismasSnow3d;

/**
 * Includes assets.
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


add_action('wp_footer', function() {
    ?><style>
    body { 
        margin: 0;
        background: #000046;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #1CB5E0, #000046);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #1CB5E0, #000046); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style><script>
    Array(200)
    .fill(null)
    .forEach((i) => document.body.append(document.createElement('br')));
</script><?php
});
