precision mediump float;
uniform sampler2D texture;
varying float distanceCamera;
// varying float op;

void main() {
    vec4 color = vec4(texture2D(texture, gl_PointCoord));
    color.w *= pow(1.0 - distanceCamera / 1500.0, 2.0);// * op;
    gl_FragColor = color;
}
