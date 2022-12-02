precision mediump float;

attribute vec3 position;
attribute vec2 opacity;

uniform vec3 cameraPosition;
varying float distanceCamera;
// varying float op;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float size;

void main() {
    distanceCamera = distance(cameraPosition, position);
    // op = 1.0;//opacity.x;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 0.9);
    gl_PointSize = (200.0 / length(modelViewPosition.xyz)) * size * opacity.x;
    gl_Position = projectionMatrix * modelViewPosition;
}
