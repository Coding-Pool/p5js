let sh_renderer;

function preload(){
  sh_renderer = loadShader("shaders/shader.vert","shaders/shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  shader(sh_renderer);
  sh_renderer.setUniform("res", [width*pixelDensity(), height*pixelDensity()]);
  sh_renderer.setUniform("time", [frameCount]);
  rect(0,0,width,height);
  
  resetShader();
}