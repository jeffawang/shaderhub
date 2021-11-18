// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159
#define TAU 6.28319

float line(vec2 point) {
    return 0.0;
}

// Exponential Impulse
// https://www.iquilezles.org/www/articles/functions/functions.htm
float expImpulse( float x, float k )
{
    float h = k*x;
    return h*exp(1.0-h);
}

#define BOOKWIDTH .4
#define BOOKOFFSET .3

float page(vec2 st, float t, float a, float thickness) {
    // Rotate stuff
    a = mod(-t+a, -PI); // Repeat half rotation.
    float ca = cos(a);
    float sa = sin(a);
    st = st*mat2(ca, -sa, sa, ca);
    
    float d = length(st);
    float theta = atan(st.y, st.x);
    // theta = mod(theta, PI/pageCount);
    st.y = sin(theta)*d;
    st.x = cos(theta)*d;

    // Make the pages look page-y
    float ei = expImpulse(st.x, 10.0)*mix(0.1, -0.1, -a/PI);
    st.y -= ei;
    
    float v = abs(st.y);

    
    float h = abs(st.x - BOOKWIDTH) - BOOKWIDTH;
    
    float c = max(v, h);
    c = step(c, thickness);
    
    return c;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    st.x *= u_resolution.x/u_resolution.y;

    float t = u_time * .5;
    st.y += BOOKOFFSET;
    
    vec3 color;
    vec3 cover;
    float coverX;
    float coverY;
    vec3 bookColor = vec3(0.2, .3, 0.2);
    
    coverX = abs(st.x) - BOOKWIDTH*2.0;
    coverY = abs(st.y+.03);
    cover = step(max(coverX, coverY), .01) * bookColor;
    
    float c = 0.0;

    const float pageCount = 10.0;
    const float incr = PI/pageCount;
    for (float i=0.0; i<pageCount; i++) {
		c = max(c, page(st, t, i*incr, .003));   
    }
    c = max(c, page(st, 0.0, 0.0, .01));
    c = max(c, page(st, 0.0, PI+.000001, .01));
    
    color = vec3(c) + cover;
    gl_FragColor=vec4(color, 1.0);

}



// 	float N=5.0;
// 	float a=atan(st.x,st.y);
// 	float b=6.28319/float(N);
// 	// vec4 f=vec4(vec3(step(.4, cos(floor(.5+a/b)*b-a)*length(st.xy))),1.);
// 	vec4 f=vec4(vec3(cos(floor(.5+a/b)*b-a)*length(st.xy)),1.);
    