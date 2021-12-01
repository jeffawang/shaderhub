// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define MAX_STEPS 20
#define THRESHOLD 0.010



float sphereSDF(vec3 p, vec3 center, float radius) {
	float a = atan(p.z, p.y);
    radius = radius + sin(p.y*5.0 + u_time*3.0)*.1;
    return length(p-center) - radius;
}

float sdf(vec3 p) {
    return sphereSDF(p, vec3(0.0, 0.0, 20.0), 13.0);
}

vec3 normal(vec3 p, float sceneDist) {
    const float epsilon = 0.01;
    vec2 s = vec2(epsilon, 0.0);
    return normalize(vec3(
        sceneDist - sdf(p + s.xyy),
        sceneDist - sdf(p + s.yxy),
        sceneDist - sdf(p + s.yyx)
    ));
}

float lightCol(vec3 p, vec3 normal) {
    vec3 light = vec3(10.0-sin(u_time*0.5)*5.0, 5.0, 0.0);
    vec3 lv = normalize(p - light);
    return dot(normal, lv);
}

void main() {
    vec2 st = (gl_FragCoord.xy/u_resolution.xy) * 2.0 - 1.0;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 cameraPos = vec3(0.0, 0.0, -1.0);
    
    vec3 rO = cameraPos;
    
    vec3 ray = normalize(vec3(st, 0.0) - rO);
    float d, sceneDist;
    vec3 _sample;
    for (int i=0; i<MAX_STEPS;i++) {
        _sample = rO + d * ray;
        sceneDist = sdf(_sample);
        d += sceneDist;
        if (sceneDist < THRESHOLD) {
            break;
        }
    }
    
    vec3 color;
    if (sceneDist < THRESHOLD) {
        vec3 n = normal(_sample, sceneDist);
        vec3 lit = vec3(lightCol(_sample, normal(_sample, sceneDist)));
        color = lit;
        // color = n;
    } else {
        color = vec3(0.0);
    }
    gl_FragColor = vec4(color,1.0);
}
