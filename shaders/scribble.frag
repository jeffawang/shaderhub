// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define POINTSIZE 0.007

// ============
// https://thebookofshaders.com/13/
// ============

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}



// ============
// https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
// ============

float dot2(vec2 v) {
    return dot(v,v);
}

float bezierSDF(vec2 pos, vec2 A, vec2 B, vec2 C) {
    vec2 a = B - A;
    vec2 b = A - 2.0*B + C;
    vec2 c = a * 2.0;
    vec2 d = A - pos;
    
    float kk = 1.0/dot(b,b);
    float kx = kk * dot(a,b);
    float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
    float kz = kk * dot(d,a);
    float res = 0.0;
    float p = ky - kx*kx;
    float p3 = p*p*p;
    float q = kx*(2.0*kx*kx - 3.0 * ky) + kz;
    float h = q*q + 4.0 * p3;
    
    if (h >= 0.0) {
        h = sqrt(h);
        vec2 x = (vec2(h, -h) - q)/2.0;
        vec2 uv = sign(x) * pow(abs(x), vec2(1.0/3.0));
        float t = clamp( uv.x+uv.y-kx, 0.0, 1.0);
        res = dot2(d + (c+b*t)*t);
    } else {
        float z = sqrt(-p);
        float v = acos(q/(p*z*2.0)) / 3.0;
        float m = cos(v);
        float n = sin(v)*1.732050808;
        vec3 t = clamp(vec3(m+m, -n-m, n-m) * z - kx, 0.0, 1.0);
        res = min( dot2(d+(c+b*t.x)*t.x),
                   dot2(d+(c+b*t.y)*t.y));
    }
    return sqrt( res );
}

float lineSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
    return length(pa - ba*h);
}

float handles(vec2 p, vec2 A, vec2 B, vec2 C) {
    float AB = lineSegment(p, A, B);
    float BC = lineSegment(p, B, C);
    
    float d = min(AB, BC);
	d = min(d, length(p-A)-POINTSIZE);
    d = min(d, length(p-B)-POINTSIZE);
    d = min(d, length(p-C)-POINTSIZE);
    return d;
}

// A and C: curve ends
// B: control point
vec3 bezier(vec2 p, vec2 A, vec2 B, vec2 C) {
    float d = bezierSDF(p, A, B, C);
    float curve = smoothstep(0.005, 0.000, d);
    float controls = handles(p, A, B, C);
    return mix(curve * vec3(1.0), vec3(1.0, 0.0, 0.0), 1.0-smoothstep(0.0, 0.0007, 1.0));
}

vec2 fbm12(int v) {
    float f = .5 * float(v) + u_time * .05;
    return vec2(
        fbm(vec2(0,f)),
        fbm(vec2(-f,0))
    ) / 1.0;
}

#define SEGMENTS 50
#define PI 3.14159
#define TAU 2.0*PI

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    // color = vec3(st.x,st.y,abs(sin(u_time)));
    vec2 A = fbm12(0);
    vec2 B = fbm12(1);
    vec2 C = fbm12(2);
    for (int i=0; i<SEGMENTS; i++) {
        float theta = TAU / float(SEGMENTS) * float(i);
        vec2 p = vec2(cos(theta),sin(theta)) * .1 + .5;
        
        A = C;
        B = B + 2.0*(C-B);
        C = fbm12(2+i);
        color = mix(color, vec3(1.0), bezier(st, A, B, C));
    }
    gl_FragColor = vec4(color,1.0);
}

