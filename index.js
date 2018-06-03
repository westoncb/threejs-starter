const THREE = require('three');
const Stats = require('stats-js');
const InputTransformer = require('./inputTransformer');

window.onload = () => {
	const basicCanvas = new BasicCanvas('canvas-container');
};

class BasicCanvas {
	constructor(containerElementId) {
		this.containerElementId = containerElementId;
		const containerElement = document.getElementById(this.containerElementId);

		this.state = {};
		this.state.canvasWidth = containerElement.offsetWidth;
		this.state.canvasHeight = containerElement.offsetHeight;

		this.initThreeJS();
		this.initScene();

		this.animate();
	}

	initScene() {
		const geometry = new THREE.BoxBufferGeometry(5, 5, 5);
		const material = new THREE.MeshStandardMaterial({color: 0x556677, metalness: 0.6, roughness: 0.4});
		this.testCube = new THREE.Mesh(geometry, material);
		this.testCube.position.z = -15;
		this.scene.add(this.testCube);
	}

	initThreeJS() {
	    this.renderer = new THREE.WebGLRenderer( { antialias: false } );
	    this.renderer.setPixelRatio( window.devicePixelRatio );
	    this.renderer.setSize( this.state.canvasWidth, this.state.canvasHeight );
	    this.renderer.setClearColor(0x000000);
	    document.getElementById(this.containerElementId).appendChild( this.renderer.domElement );

	    this.stats = new Stats();
	    this.stats.setMode( 0 );
	    this.stats.domElement.style.position = 'absolute';
	    this.stats.domElement.style.left = '0px';
	    this.stats.domElement.style.top = '0px';
	    document.body.appendChild( this.stats.domElement );

	    this.scene = new THREE.Scene();
	    this.near = 1;
	    this.far = 2000;
	    this.camera = new THREE.PerspectiveCamera( 45, this.state.canvasWidth / this.state.canvasHeight, this.near, this.far );
	    this.scene.add(this.camera);

	    const lightTarget = new THREE.Object3D();
	    lightTarget.position.set(-1, -1, -10);
	    this.scene.add(lightTarget);

	    const hemiLight = new THREE.HemisphereLight( 0xA0A0A0, 0x404040, 1);
	    hemiLight.position.set(0, 0, 1);
	    this.scene.add(hemiLight);

	    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	    directionalLight.target = lightTarget;

	    directionalLight.position.z += 10;
	    this.camera.add( directionalLight );
	    this.dirLight = directionalLight;

	    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

	    this.inputTransformer = new InputTransformer(this.renderer.domElement, this.camera, this.scene);
	}

	animate(time) {
	    this.stats.begin();

	    this.testCube.rotation.y += Math.PI / 200;
	    this.testCube.rotation.x += Math.PI / 500;
	    
	    requestAnimationFrame( this.animate.bind(this) );

	    this.renderer.render( this.scene, this.camera );

	    this.stats.end();
	}

	onWindowResize( event ) {
	    const containerElement = document.getElementById(this.containerElementId);
	    this.state.canvasWidth = containerElement.offsetWidth;
	    this.state.canvasHeight = containerElement.offsetHeight;
	    this.renderer.setSize( this.state.canvasWidth, this.state.canvasHeight );
	    this.camera.aspect = this.state.canvasWidth / this.state.canvasHeight;
	    this.camera.updateProjectionMatrix();
	}
}