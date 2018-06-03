This is a probably somewhat quirky template/skeleton for three.js projects. Sets up a scene with a perspective camera looking at a rotating cube. Uses OrbitControls, adds the three js stat tracker, and dat.gui. The canvas is set up to match the size of a dom element whose id you specify, and will resize when the window is resized. 

To run:
- `npm install`
- `watchify index.js -o './build/bundle.js'`
- `npm i http-server`
- `http-server -p <portNumber>`
- Open browser at `http://localhost:<portNumber>` (I'd recommend using the Chrome 'LivePage' auto-reloading plugin)
