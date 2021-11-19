const shaderSrcs = [
  {
    "name": "mouse",
    "src": "/shaders/mouse.frag",
    "parameters": [
      {
        "type": "slider",
        "name": "Amount of fun",
        "uniform": "u_fun",
        "defaultValue": 0.5
      },
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
    "src": "/shaders/circles.frag",
    "parameters": [
      {
        "type": "slider",
        "name": "radius",
        "uniform": "u_radius",
        "defaultValue": 0.5
      }
    ]
  },
  {
    "name": "squiggly-circle",
    "src": "/shaders/squigglycircle.frag",
    "parameters": [
      {
        "type": "slider",
        "name": "radius",
        "uniform": "u_radius",
        "defaultValue": 0.5
      },
      {
        "type": "slider",
        "name": "squiggliness",
        "uniform": "u_squiggliness",
        "defaultValue": 0.5
      },
      {
        "type": "radio",
        "name": "Favorite signal",
        "defaultValue": "u_square",
        "options": [{
          "name": "Sine",
          "uniform": "u_sine"
        }, {
          "name": "Saw",
          "uniform": "u_saw"
        }, {
          "name": "Square",
          "uniform": "u_square"
        }]
      }
    ]
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