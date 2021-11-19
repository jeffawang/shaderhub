const shaderSrcs = [
  {
    "name": "mouse",
    "src": "/shaders/mouse.frag",
    "parameters": [
      {
        "type": "radio",
        "name": "Favorite signal",
        "defaultValue": "u_sine",
        "options": [{
          "name": "Sine",
          "uniform": "u_sine"
        }, {
          "name": "Square",
          "uniform": "u_square"
        }]
      }
    ]
  },
  {
    "name": "circles",
    "src": "/shaders/circles.frag"
  },
  {
    "name": "squiggly-circle",
    "src": "/shaders/squigglycircle.frag"
  },
  {
    "name": "book",
    "src": "/shaders/book.frag"
  }
]

const shaderDefaults = {
  "name": "unnamed",
  "width": "512px",
  "height": "512px",
  "parameters": []
}

export {shaderSrcs, shaderDefaults}