(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(9365)}])},9365:function(e,n,r){"use strict";r.r(n),r.d(n,{__N_SSG:function(){return w},default:function(){return b}});var t=r(5893),u=r(806),i=r(8527),s=r(7294),o=r(6447),l=r(4204),c=r(9762),a=function(e){var n=e.control,r=e.uniforms;(0,s.useEffect)((function(){n.options.map((function(e){r.current[e.uniform]={type:"b",value:e.uniform===n.defaultValue}}))}));return(0,t.jsxs)(c.NI,{as:"fieldset",children:[(0,t.jsx)(c.lX,{as:"legend",children:n.name}),(0,t.jsx)(l.Ee,{defaultValue:n.defaultValue,onChange:function(e){n.options.map((function(n){r.current[n.uniform].value=n.uniform===e}))},children:(0,t.jsx)(i.Ug,{spacing:"24px",children:n.options.map((function(e){return(0,t.jsx)(l.Y8,{defaultChecked:e.uniform===n.defaultValue,value:e.uniform,children:e.name},e.uniform)}))})}),(0,t.jsx)(c.Q6,{children:n.description})]})},f=r(6114),d=r(918),h=function(e){var n=e.control,r=e.uniforms,u=(0,s.useState)(n.defaultValue),o=u[0],l=u[1];(0,s.useEffect)((function(){r.current[n.uniform]={type:"f",value:o}}));var c=function(e){l(e),r.current[n.uniform].value=o};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.xv,{children:n.name}),(0,t.jsxs)(i.xu,{display:"flex",style:{gap:20},children:[(0,t.jsx)(f.Y2,{value:o,onChange:function(e,n){c(n)},size:"xs",textAlign:"right",max:1,min:0,maxW:"3rem",children:(0,t.jsx)(f.zu,{paddingLeft:"0.3em",paddingRight:"0.3em",textAlign:"right"})}),(0,t.jsxs)(d.iR,{step:.01,onChange:c,focusThumbOnChange:!1,min:0,max:1,"aria-label":"slider-".concat(n.uniform),value:o,children:[(0,t.jsx)(d.Uj,{children:(0,t.jsx)(d.Ms,{})}),(0,t.jsx)(d.gs,{})]})]})]})},x=r(2212);function m(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function v(e){var n=(0,s.useRef)(null),r=(0,s.useState)("\nuniform vec2 u_resolution;\nuniform float u_time;\n\nfloat circle(vec2 xy, float r) {\n  return length(xy) - r;\n}\n\nvoid main() {\n    vec2 st = (gl_FragCoord.xy * 2.0)/u_resolution.xy-1.0;\n    st.x *= u_resolution.xy.x / u_resolution.xy.y;\n\n    float d = step(circle(st, .2), 0.0) * (sin(u_time * 3.0) * .5 + .5);\n    gl_FragColor=vec4(d,d,d,1.0);\n}\n"),u=r[0],i=r[1],l=e.canvasRef.current,c=e.uniforms;(0,s.useEffect)((function(){c.current.u_resolution.value.set(l.clientWidth,l.clientHeight),fetch(e.shaderSrc.src).then((function(e){return e.text()})).then((function(e){i(e)}))}),[]);var a=(0,o.Ky)((function(e){return e.gl}));return(0,s.useEffect)((function(){var e=function(){c.current.u_resolution.value.set(l.clientWidth,l.clientHeight)};return window.addEventListener("resize",e),a.domElement.addEventListener("mousemove",(function(e){var n=e.offsetX,r=l.clientHeight-e.offsetY;c.current.u_mouse.value.set(n,r)})),function(){window.removeEventListener("resize",e)}}),[]),(0,o.xQ)((function(e,n){var r=e.gl,t=e.scene,u=e.camera;c.current.u_time.value+=n,r.render(t,u)}),1),(0,t.jsxs)("mesh",function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){m(e,n,r[n])}))}return e}({},e,{ref:n,children:[(0,t.jsx)("planeBufferGeometry",{args:[2,3]}),(0,t.jsx)("shaderMaterial",{vertexShader:"\nvoid main() {\n  gl_Position = vec4( position, 1.0 );\n}\n",fragmentShader:u,uniforms:c.current,onUpdate:function(e){e.needsUpdate=!0}})]}))}var p=function(e){var n=e.shaderSrc,r=e.uniforms;return(0,t.jsx)(i.xu,{display:"flex",flexDirection:"column",flexGrow:"1",style:{gap:10},children:n.parameters.map((function(e){return(0,t.jsx)(j,{control:e,uniforms:r},e.uniform)}))})},j=function(e){var n=e.control,r=e.uniforms;switch(n.type){case"radio":return(0,t.jsx)(a,{control:n,uniforms:r});case"slider":return(0,t.jsx)(h,{control:n,uniforms:r})}return null},g=function(e){var n=e.shaderSrc,r=(0,s.useRef)(),u=(0,s.useRef)(null),l=(0,s.useRef)({u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new x.Vector2(0,0)},u_mouse:{type:"v2",value:new x.Vector2},u_sine:{type:"b",value:!1}});return(0,t.jsx)("div",{children:(0,t.jsxs)(i.xu,{ref:u,padding:4,display:"flex",style:{gap:"20px"},children:[(0,t.jsx)(i.xu,{children:(0,t.jsx)(o.Xz,{ref:r,style:{width:n.width,height:n.height},children:(0,t.jsx)(v,{canvasRef:r,shaderSrc:n,uniforms:l})})}),(0,t.jsx)(p,{shaderSrc:n,uniforms:l})]})})},y=r(1664);function _(e){var n=e.children;return(0,t.jsx)(i.xu,{children:(0,t.jsxs)("div",{className:"App",children:[(0,t.jsx)(i.xu,{width:"100%",display:"flex",alignItems:"center",justifyContent:"left",borderBottom:"1px solid #edeff5",padding:"20px",children:(0,t.jsx)(i.X6,{children:(0,t.jsx)(y.default,{href:"/",children:"shaderhub"})})}),n]})})}var w=!0;function b(e){for(var n=e.shaderSrcs,r=[],s=0;s<n.length;s++){var o=n[s];window.location.hash.substr(1)===o.name&&r.push(s)}return(0,t.jsx)(_,{children:(0,t.jsx)(u.UQ,{defaultIndex:r,allowMultiple:!0,children:n.map((function(e){return(0,t.jsx)(u.Qd,{children:(0,t.jsxs)("h2",{children:[(0,t.jsxs)(u.KF,{_expanded:{bgColor:"gray.700"},children:[(0,t.jsx)(i.xu,{flex:"1",textAlign:"left",children:e.name}),(0,t.jsx)(u.XE,{})]}),(0,t.jsx)(u.Hk,{pb:4,children:(0,t.jsx)(g,{shaderSrc:e})})]})},e.name)}))})})}}},function(e){e.O(0,[737,787,774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);