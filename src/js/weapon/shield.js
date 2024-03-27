const THREE = require('three');

class Shield {
  constructor({shape = 'round', size = 1, thickness = 0.1, handleType = 'one-handed', material}) {
    this.shape = shape;
    this.size = size;
    this.thickness = thickness;
    this.handleType = handleType; // 'one-handed' or 'two-handed'
    this.material = material; // A Three.js material
    this.mesh = this.createShieldMesh();
  }

  createShieldMesh() {
    let geometry;
    switch (this.shape) {
      case 'round':
        geometry = new THREE.CylinderGeometry(this.size, this.size, this.thickness, 32);
        geometry.rotateX(Math.PI / 2); // Orient the shield to face forwards
        break;
      case 'square':
        geometry = new THREE.BoxGeometry(this.size, this.size, this.thickness);
        break;
      case 'rectangular':
        geometry = new THREE.BoxGeometry(this.size * 0.75, this.size, this.thickness);
        break;
      // Add more shapes as needed
      default:
        console.warn('Unsupported shield shape');
        geometry = new THREE.BoxGeometry(this.size, this.size, this.thickness); // Fallback
    }

    const mesh = new THREE.Mesh(geometry, this.material);

    // Additional customization based on handleType or other properties can go here

    return mesh;
  }

  // Method to adjust the shield grip based on handle type - this is more conceptual,
  // as visual representation of the grip might require additional geometries or textures
  adjustGrip() {
    // Logic to adjust grip based on 'one-handed' or 'two-handed'
    // This could affect the positioning of the shield or add visual elements to represent the grip
  }
}
module.exports = { Shield };