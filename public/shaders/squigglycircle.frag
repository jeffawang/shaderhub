#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159
#define TAU 6.28319

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    st.x *= u_resolution.x/u_resolution.y;
    
    float t = u_time;
    
    float theta = atan(st.y, st.x);
    float r = .6;
    float thickness = .01;
    float squiggliness = 0.05;
    
    float extra = (cos(theta + t * 1.) * .5 + .5) * cos(theta * 20.0 - t * 10.0 ) * squiggliness;
    
    float d = abs(length(st) - (r + extra));

    d = step(thickness, d);
    
    vec3 color = vec3( 1.0 - d );
    gl_FragColor=vec4(color, 1.0);

}
