uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= u_mouse / u_resolution;
    st = mod(st, 1.0);
    gl_FragColor=vec4(st.x,st.y,0.0,1.0);
}

