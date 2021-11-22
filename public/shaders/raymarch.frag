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

#define PI 3.14159
#define TAU 6.28319

#define MAX_STEPS 18
#define THRESHOLD .01

vec2 cameraPos = vec2(-.5, 0.0);
float cameraRadius = 0.1;
vec3 cameraColor = vec3(0.730,0.824,1.000);

vec2 circlePos = vec2(.25, -.3);
float circleRadius = 0.2;
vec3 circleColor = vec3(1.000,0.653,0.907);

// SDF Functions
float getCameraDist(vec2 point) {
    return length(point-cameraPos) - cameraRadius;
}

float getRayDistance(vec2 point) {
    // X = O + D * dot(P-O, D);
    //   X: projected point
    //   O: vector origin
    //   D: vector direction
    vec2 m = u_mouse/u_resolution.xy * 2.0 - 1.0;
    vec2 O = cameraPos;
    vec2 D = vec2(1.0, 0.0);
    D = normalize(m - O);
    
    vec2 P = point;
    vec2 X = O + D * dot(P-O,D);
    
    float fullLine = length(P-X);
    
    float rayMask=dot(normalize(m-O), normalize(P-O));
    rayMask = step(rayMask, 0.0);
    
    float ray = rayMask + fullLine;
    return ray;
}

float getCircleDist(vec2 point, vec2 center, float radius) {
    float circleDist = length(point - center) - radius;
    return circleDist;
}

float getBoxDist(vec2 p, vec2 b) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

// Main Scene SDF
float getSceneDist(vec2 point) {
    vec2 rot = vec2(sin(u_time), cos(u_time));
    float circle = min(
        getCircleDist(point, circlePos, circleRadius),
        getCircleDist(point, vec2(0.25,0.25), circleRadius)
	);
    float box = getBoxDist(point - vec2(0.0, 0.5), vec2(0.2, 0.2));
    
    float d = min(box, circle);
    return d;
}

// Higher level drawing functions
float outline(float d) {
    return step(-0.005, d) - step(0.005, d);
}

float drawCircle(vec2 st, vec2 center, float radius) {
    float cd = getCircleDist(st, center, radius);
    return outline(cd);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 m = u_mouse/u_resolution.xy * 2.0 - 1.0;
    m.x *= u_resolution.x/u_resolution.y;

    vec3 color;
    
    // Draw widgets
    float cameraDist = getCameraDist(st);
    vec3 camera = (step(0.01, cameraDist) - step(0.02, cameraDist)) * cameraColor;
    
    float rayDist = getRayDistance(st);
    vec3 ray = (step(rayDist, 0.005)) * cameraColor;
    // line = lineDist * cameraColor;
    
    // Draw scene
    float circleDist = getSceneDist(st);
    vec3 circle = (outline(circleDist)) * circleColor;
    
    // Visualize a ray march starting at cameraPos
    vec2 rO = cameraPos;
    vec2 rD = normalize(m - rO);
    float d = 0.0;
    
    float rayMarchCircles = 0.0;
    float radius;

    vec2 ri = rO;
    for (int i=0; i<MAX_STEPS; i++) {
	    radius = getSceneDist(ri);
        if (radius < THRESHOLD) break;
        rayMarchCircles += drawCircle(st, ri, radius) * mix(0.3, 1.0, float(i)/float(MAX_STEPS));
        d += radius;
        ri = rO + rD * d;
    }
    
    vec3 rayMarchColor = radius < THRESHOLD ? vec3(0.054,1.000,0.719) : vec3(1.000,0.364,0.239);
    rayMarchColor *= rayMarchCircles;
    

    color = rayMarchColor + circle + camera + ray;
    // color = vec3(lineDist);
    gl_FragColor=vec4(color, 1.0);

}
