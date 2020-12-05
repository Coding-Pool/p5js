#ifdef GL_ES
precision highp float;
#endif

uniform float pixel_density;
uniform vec2 res;
uniform sampler2D buffer;
uniform float render_mode;
uniform float time;

// 핑퐁버퍼를 그대로 그려주고 있는 부분!
// 렌더링하는 다양한 효과를 적용하고 싶다면 여기서 할것.

void main() {
  vec2 st = gl_FragCoord.xy;
  vec3 col = vec3(0);
  
  vec2 tc = st / (res * pixel_density);
  vec3 buffer_samp = texture2D(buffer,tc).xyz;
  
  col = buffer_samp.xyz;
  //col = sin(buffer_samp.xyz * 3.1415 * 8.) * 0.5 + 0.5;
  //col = vec3(smoothstep(0.2,0.8,col.x),0.5,0.5);
  
  gl_FragColor = vec4(col,1.0);
}
