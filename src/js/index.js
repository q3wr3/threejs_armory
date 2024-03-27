import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Armory } from './Armory';

import Helmet from './armor/Helmet';
import ChestPlate from './armor/ChestPlate';
import Gauntlets from './armor/Gauntlets';
import ShoulderGuard from './armor/ShoulderGuard';
import Sabatons from './armor/Sabatons';
import Bracers from './armor/Bracers';
import Sword from './weapon/Sword';
import Shield from './weapon/Shield';
import Staff from './weapon/Staff';
import Hammer from './weapon/Hammer';
import Dagger from './weapon/Dagger';
import Axe from './weapon/Axe';

// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Camera position
camera.position.set(0, 1, 2);
controls.update();

// Lighting
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1); // Position the light
scene.add(directionalLight);

const armory = new Armory();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
var sword = armory.addWeapon(Sword,4, 1);


scene.add(sword.mesh);


// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}

animate();