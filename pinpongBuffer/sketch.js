// 최종적으로 그려주는 쉐이더
let sh_render;
// 더해주고 흐리게 만드는 쉐이더
let sh_addAndFade;

// "더하는게" 가능하도록 두개의 버퍼를 만든다.
let pingpongbuffer = [];

function preload() {
  sh_render = loadShader("shaders/render.vert", "shaders/render.frag");
  sh_addAndFade = loadShader("shaders/addAndFade.vert", "shaders/addAndFade.frag");
}

function setup() {
  pixelDensity(1);
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  // 핑퐁버퍼를 쓰기 위해 2개의 그래픽을 만든다.
  pingpongbuffer[0] = createGraphics(width, height, WEBGL);
  pingpongbuffer[1] = createGraphics(width, height, WEBGL);
  
  // 초기값 : 이 값을 기준으로 값이 더해진다고 생각하면된다.
  pingpongbuffer[1].background(255, 0, 0);
  
}

function addToBuffer() {
  // 1. 0번째 핑퐁버퍼에 그림을 그려주는데, 이때 초기값이 설정된 1번째 핑퐁버퍼의 값을 참조한다 (쉐이더 프로그램에서는 이전 값에 새로 값을 더해주는 단계)
  // 2. 1번째 핑퐁버퍼에 0번째 핑퐁버퍼에 그려지는 것을 그대로 복사해서 넣어준다.
  
  pingpongbuffer[0].clear();

  pingpongbuffer[0].shader(sh_addAndFade);
  sh_addAndFade.setUniform("buffer", pingpongbuffer[1]);
  sh_addAndFade.setUniform("res", [width, height]);
  sh_addAndFade.setUniform("pixel_density", [pixelDensity()]);
  sh_addAndFade.setUniform("time", [frameCount]);

  let mx = mouseX / width;
  let my = 1 + (-1 * mouseY / height);

  sh_addAndFade.setUniform("mouse", [mx, my]);

  pingpongbuffer[0].rect(0, 0, width, height);

  pingpongbuffer[1].clear();
  pingpongbuffer[1].image(pingpongbuffer[0], -width * 0.5, height * 0.5, width, -height);
}

function draw() {
  
  // 일정시간 기준으로 리셋
  if(frameCount % 300 == 0){
    pingpongbuffer[1].background(255, 0, 0);
  }
  
  addToBuffer();
  
  clear();
  
  shader(sh_render);
  sh_render.setUniform("buffer", pingpongbuffer[1]);
  sh_render.setUniform("res", [width, height]);
  sh_render.setUniform("pixel_density", [pixelDensity()]);
  sh_render.setUniform("time", [frameCount]);
  
  rect(0, 0, width, height);
 
}