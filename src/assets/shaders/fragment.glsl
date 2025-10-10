varying vec2 vUv;
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vUv, 0.0, 1.);
  gl_FragColor = vec4(vColor, 1.);
}