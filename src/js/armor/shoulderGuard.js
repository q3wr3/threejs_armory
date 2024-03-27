const THREE = require('three');

class ShoulderGuard {
  constructor(variant = 'dual', size = 1, material = new THREE.MeshStandardMaterial()) {
    this.variant = variant;
    this.size = size;
    this.material = material;
    this.mesh = new THREE.Group(); // Use a Group to potentially combine multiple parts
    this.createShoulderGuards();
  }

  createShoulderGuards() {
    if (this.variant === 'dual' || this.variant === 'left') {
      const leftGuard = this.createSingleGuard();
      leftGuard.position.set(-this.size * 0.5, 0, 0); // Positioning for the left shoulder
      this.mesh.add(leftGuard);
    }

    if (this.variant === 'dual' || this.variant === 'right') {
      const rightGuard = this.createSingleGuard();
      rightGuard.position.set(this.size * 0.5, 0, 0); // Positioning for the right shoulder
      this.mesh.add(rightGuard);
    }
  }

  createSingleGuard() {
    const geometry = new THREE.BoxGeometry(this.size * 0.75, this.size * 0.5, this.size * 0.5);
    geometry.translate(0, this.size * 0.25, 0); // Adjust so the guard 'sits' on the shoulder
    const mesh = new THREE.Mesh(geometry, this.material);
    return mesh;
  }
}
module.exports = { ShoulderGuard };