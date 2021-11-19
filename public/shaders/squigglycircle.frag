#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform bool u_sine;
uniform bool u_square;
uniform bool u_saw;
uniform float u_radius;
uniform float u_squiggliness;

#define PI 3.14159
#define TAU 6.28319

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    st.x *= u_resolution.x/u_resolution.y;
    
    float t = u_time;
    
    float theta = atan(st.y, st.x);
    float r = u_radius;
    float thickness = .01;
    float squiggliness = 0.1 * u_squiggliness;
    
    float extra = (cos(theta + t * 1.) * .5 + .5);

    if (u_sine) {
	    extra *= cos(theta * 20.0 - t * 10.0 ) * squiggliness;
    } else if (u_saw) {
        extra *= fract(theta * 10.0 - t * 1.0 ) * squiggliness * 3.;
    } else if (u_square) {
        extra *= floor(fract(theta * 5.0 - t * 1.0 )*2.) * squiggliness * 3.;
    }
    
    
    float d = abs(length(st) - (r + extra));

    d = step(thickness, d);

    vec3 color = vec3( 1.0 - d );
    gl_FragColor=vec4(color, 1.0);

}
