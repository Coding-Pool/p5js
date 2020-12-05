#ifdef GL_ES
precision highp float;
#endif

// 픽셀 밀도
uniform float pixel_density;
// 화면 가로, 세로
uniform vec2 res;
// 텍스처
uniform sampler2D buffer;
// 시간
uniform float time;
// 마우스 위치
uniform vec2 mouse;

void main() {
  // gl_FragCoord.xy는 픽셀의 위치라고 생각하면 된다.
  vec2 st = gl_FragCoord.xy;
  
  vec3 col = vec3(0);
  
  // 픽셀 위치를 0~1 사이 값으로 변화하고 있다.
  vec2 tc = st / (res * pixel_density);
  
  // 픽셀 위치를 0~1 사이 값으로 변화하고 있다.
  vec2 buffer_tc = st / (res * pixel_density);
  // 백버퍼 y방향이 뒤집혀서 그려지고 있어서 수정
  buffer_tc.y = 1. + buffer_tc.y * -1.; 
  
  // 백버퍼 이미지에서 texture2D라는 함수로 픽셀값을 가져온다.
  // texture2D(텍스처, 텍스처 좌표(0~1사이 값))
  vec3 buffer_samp = texture2D(buffer, buffer_tc).xyz;
  
  // 원의 반지름
  float r = 0.2;
  // 조건에 따라서 원의 기준에 부합하는 픽셀은 하얀색이 된다.
  float ell = smoothstep(r,r-0.01,length((tc-mouse) * res / res.y));
  
  // 현재 화면에 이전 화면의 픽셀 값을 더 어둡게 해서 더해준다.
  col = vec3(ell) + buffer_samp.xyz * 0.98;
  
  // 실제로 화면에 그려지는 픽셀값.
  gl_FragColor = vec4(col,1.0);
}
