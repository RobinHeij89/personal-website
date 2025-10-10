uniform float time;
uniform vec3 uColor[5];
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 newUv = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
  
  // Create a simple animated pattern
  float pattern = sin(newUv.x * 10.0 + time) * sin(newUv.y * 10.0 + time * 0.5);
  
  // Interpolate between colors based on pattern
  vec3 color1 = uColor[0];
  vec3 color2 = uColor[1];
  vec3 finalColor = mix(color1, color2, pattern * 0.5 + 0.5);
  
  gl_FragColor = vec4(finalColor, 1.0);
}