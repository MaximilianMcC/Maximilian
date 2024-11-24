
const terminalInput = document.querySelector("#terminalInput");
terminalInput.focus();


// Get the thingy to render to
const renderOutput = document.querySelector(".render-output");
const aspectRatio = renderOutput.clientHeight / renderOutput.clientWidth;
console.log(renderOutput);

// Setup the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
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
screenTexture.flipY = false; // Fix upside-down texture
const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });


// Load the model
const loader = new THREE.GLTFLoader();
let crt;

loader.load(
	"./assets/model/crt.glb",
	(gltf) => {
		crt = gltf.scene;
		crt.rotation.y = -0.1;

		scene.add(crt);

		crt.traverse((child) => {
			if (child.isMesh && child.name === "screen") {
				child.material = screenMaterial;
			}
		});
	},
	undefined,
	(error) => {
		console.error(error);
	}
);

// Set camera position
camera.position.z = 3;
camera.position.y = 0.5;

// Function to draw to the canvas
function updateTerminal() {
	ctx.clearRect(0, 0, terminalCanvas.width, terminalCanvas.height); // Clear the canvas

	ctx.font = "20px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText(terminalInput.value, 50, 50);

	// Update the canvas texture
	screenTexture.needsUpdate = true;
}

// Animation loop
function animate() {
	requestAnimationFrame(animate);
	updateTerminal(); // Update terminal canvas
	renderer.render(scene, camera);
}
animate();
