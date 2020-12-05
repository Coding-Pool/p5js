// https://github.com/aferriss/p5jsShaderExamples
// 여기서 버텍스 쉐이더는 이미지를 그려줄 직사각형을 그리는 기능만 하고 있다.

#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aPosition;

// Always include this to get the position of the pixel and map the shader correctly onto the shape

void main() {

  // Copy the position data into a vec4, adding 1.0 as the w parameter
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Scale to make the output fit the canvas
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 

  // Send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}