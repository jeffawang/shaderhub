// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_radius;

#define PI 3.14159
#define TAU 6.28319

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    st.x *= u_resolution.x/u_resolution.y;
    
    float t = u_time;
    

    float r = .4 ;
    r = u_radius;
    float thickness = .01;
    float d = abs(length(st) - r);
    // d = step(thickness, d);
    // d = step(abs(d), thickness * 0.5);
        
    float count = 5.0;
    float period = TAU/count;

    float ballRadius = .1;
    float ballAngle = 0.0;
    
    vec2 ballCenter = vec2(cos(ballAngle), sin(ballAngle)) * r;
    
    float angle = atan(st.y, st.x);
    angle = mod(angle+t, period) - period*0.5;
    
    vec2 point = vec2(cos(angle), sin(angle)) * length(st);
    
    float bd = length(point - ballCenter) - .1;
    bd = abs(bd);
    // bd = step(0.01, bd);
    
    float dist = step(0.01, min(d, bd));
    
    vec3 color = vec3( 1.0 - dist );
    gl_FragColor=vec4(color, 1.0);

}

