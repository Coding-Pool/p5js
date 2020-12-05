
// 쉐이더로 그려주는 부분
let sh_render;

// 백버퍼 (이전 프레임을 기록하는 화면에 실제로 그려지지는 않는 캔버스)
let backbuffer;
// 메인 캔버스
let canvas;

function preload() {
  sh_render = loadShader("shaders/render.vert", "shaders/render.frag");
}

function setup() {
  pixelDensity(1);
  
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  
  // 백버퍼로 쓸 캔버스를 만들어준다.
  backbuffer = createGraphics(width, height, WEBGL);
  backbuffer.clear();
}

function draw() {
  
  // 이전 프레임에서 메인 캔버스에 그려진 이미지를 백버퍼로 옮겨오는 부분
  backbuffer.clear();
  backbuffer.image(canvas, width * -0.5, height * -0.5, width, height);
  
  clear();
  
  shader(sh_render);
  // 이전 프레임이 그려진 백버퍼를 쉐이더 프로그램에 넣어준다.
  sh_render.setUniform("buffer", backbuffer);
  // 현재 화면 크기에 따라 계산하기 위한 값 넣어주기.
  sh_render.setUniform("res", [width, height]);
  // 화면 크기를 정확하게 계산하기 위한 값
  sh_render.setUniform("pixel_density", [pixelDensity()]);
  // 시간 현재 프레임 카운트
  sh_render.setUniform("time", [frameCount]);
  
  // 마우스 좌표, 쉐이더에서 픽셀의 위치를 0~1사이 값으로 변환해서 사용하고 있기 때문에 마우스 좌표도 그것에 맞추어 바꿔주고 있다.
  let mx = mouseX / width;
  let my = 1 + (-1 * mouseY / height);

  sh_render.setUniform("mouse", [mx, my]);
  
  rect(0, 0, width, height);
 
}