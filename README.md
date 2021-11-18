# Shaderhub

Just a place to put some shaders and whatnot.

Steps to add shaders

1. Put shaders in the `public/shaders/` directory.
2. Add the shader to the `src/shaders.js` file (see below for schema).
3. Commit, then deploy with `make`.

It should be an object something like:

```
  {
    "name": "circles",
    "src": "/shaders/circles.frag",
    "width": "500px",
    "height": "500px"
  }
```

```
# Build the site and put it into the gh-pages branch.
# Warning: does some weird git stuff.
make
```
