


// Get the thingy to render to
const renderOutput = document.querySelector(".render-output");
const aspectRatio = renderOutput.clientHeight / renderOutput.clientWidth;
console.log(renderOutput);

// Setup the scene
const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Target the render-output div
renderer.setSize(renderOutput.clientWidth, renderOutput.clientHeight);
renderOutput.appendChild(renderer.domElement);

// Update camera aspect
camera.aspect = renderOutput.clientWidth / renderOutput.clientHeight;
camera.updateProjectionMatrix();

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Make the canvas for drawing the terminal
const terminalCanvas = document.createElement("canvas");
const ctx = terminalCanvas.getContext("2d");

terminalCanvas.width = 400;
terminalCanvas.height = 300;

const screenTexture = new THREE.CanvasTexture(terminalCanvas);
screenTexture.flipY = false;
const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });


// Load the model
const loader = new THREE.GLTFLoader();
let crt;

loader.load(
	"./assets/model/crt.glb",
	(gltf) => {
		crt = gltf.scene;

		// Steal the camera from the model
		camera = gltf.cameras[0];

		// Make sure the aspect ratio is all the same
		const cameraAspectRatio = camera.aspect || (renderOutput.clientWidth / renderOutput.clientHeight);
		camera.aspect = cameraAspectRatio;
		camera.updateProjectionMatrix();
		renderer.setSize(renderOutput.clientWidth, renderOutput.clientWidth / cameraAspectRatio);

		scene.add(crt);

		crt.traverse((child) => {
			
			// Check for if we've found the screen
			if (child.isMesh && child.name === "Screen") {
				child.material = screenMaterial;
			}
		});
	},
	undefined,
	(error) => {
		console.error(error);
	}
);

// camera.position.z = 3;
// camera.position.y = 0.5;

// Animation loop
function animate() {
	requestAnimationFrame(animate);

	// Terminal stuff
	update();
	draw();

	renderer.render(scene, camera);
}
animate();
