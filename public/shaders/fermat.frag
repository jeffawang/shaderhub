// Author: Jeff
// Title: Fermats

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159;
const float TAU = 2.0*PI;

float sdSpiral(vec2 st, float da, float c) {
	float r = length(st);
    float a = mod(atan(st.y, st.x) + TAU + da, TAU);
    
    float x = (r*r)/(c*c);
    float cycles = x - mod(x, TAU);
    
    float theta = cycles + a;
    
    return c*sqrt(theta)-r*(sin(u_time)*.5+.5);
}

void main() {
    vec2 st = (gl_FragCoord.xy/u_resolution.xy * 2.0) - 1.0;
    st.x *= u_resolution.x/u_resolution.y;
    // Zoom
    st *= 5.0;
    
    // periodically flip x to switch spiral direction
    st.x *= 1.0 - floor(mod(-PI*1.5 + u_time/TAU, 2.0))*2.0;
    
    vec3 color = vec3(0.0);

 	float c = 1.0;
    
    float col = step(0.0, sdSpiral(st, 0.0, c));
	// col = step(0.0, sdSpiral(st, PI, c)); 
	col -= step(0.0, sdSpiral(st, PI, c));

    // Not sure why this is necessary?
    col += step(0.0, col) - step(st.y, 0.0);
    
    color = vec3(col);
    gl_FragColor = vec4(color,1.0);
}

