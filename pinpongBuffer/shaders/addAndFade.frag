#ifdef GL_ES
precision highp float;
#endif

uniform float pixel_density;
uniform vec2 res;
uniform sampler2D buffer;
uniform vec2 mouse;
uniform float time;

void main() {
  vec2 st = gl_FragCoord.xy;
  vec2 tc = st / (res * pixel_density);
  
  // 1, 2, 3, 4, 5, 6, 7, 8 -> 현재 픽셀 주변 8개의 픽셀을 참조한다.
  /*
  |1||2||3|
  |4|| ||5|
  |6||7||8|
  */
  
  vec2 tc_1 = (st + vec2(-1.,1.)) / (res * pixel_density);
  vec2 tc_2 = (st + vec2(0.,1.)) / (res * pixel_density);
  vec2 tc_3 = (st + vec2(1.,1.)) / (res * pixel_density);
  
  vec2 tc_4 = (st + vec2(-1.,0.)) / (res * pixel_density);
  vec2 tc_5 = (st + vec2(1.,0.)) / (res * pixel_density);
  
  vec2 tc_6 = (st + vec2(-1.,-1.)) / (res * pixel_density);
  vec2 tc_7 = (st + vec2(0.,-1.)) / (res * pixel_density);
  vec2 tc_8 = (st + vec2(1.,-1.)) / (res * pixel_density);
  
  vec4 samp = texture2D(buffer,tc);
  
  vec4 samp_1 = texture2D(buffer,tc_1);
  vec4 samp_2 = texture2D(buffer,tc_2);
  
  vec4 samp_3 = texture2D(buffer,tc_3);
  vec4 samp_4 = texture2D(buffer,tc_4);
  vec4 samp_5 = texture2D(buffer,tc_5);
  
  vec4 samp_6 = texture2D(buffer,tc_6);
  vec4 samp_7 = texture2D(buffer,tc_7);
  vec4 samp_8 = texture2D(buffer,tc_8);
  
  // 주변 8개의 픽셀의 평균값을 구한다. 마지막에 곱해진 값이 커지면 경계가 명확한 덩어리가 생기고, 작아지면 경계가 흐려지고, 흐려지는 속도가 줄어든다.
  samp = (samp_1 + samp_2 + samp_3 + samp_4 + samp_5 + samp_6 + samp_7 + samp_8) * 0.125 * 1.2; 
  
  // 마우스 위치 주변으로 원 형태로 색 값이 더해지는 부분.
  if(length((tc - mouse) * res / res.y) < 0.02){
    samp += 0.1;
  }
  

  gl_FragColor = vec4(samp.xyz,1.0); 
}
