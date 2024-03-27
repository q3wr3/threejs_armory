const THREE = require('three');

class Staff {
  constructor(shaftLength, shaftDiameter, headpieceSize, shaftMaterial, headpieceMaterial) {
    this.shaftLength = shaftLength;
    this.shaftDiameter = shaftDiameter;
    this.headpieceSize = headpieceSize;
    this.shaftMaterial = shaftMaterial; // A Three.js material for the shaft
    this.headpieceMaterial = headpieceMaterial; // A Three.js material for the headpiece
    this.mesh = this.createStaffMesh();
  }

  createShaft() {
    const geometry = new THREE.CylinderGeometry(this.shaftDiameter / 2, this.shaftDiameter / 2, this.shaftLength, 32);
    const mesh = new THREE.Mesh(geometry, this.shaftMaterial);
    mesh.position.y = this.shaftLength / 2; // Adjust position so the base is at y = 0
    return mesh;
  }

  createHeadpiece() {
    const geometry = new THREE.SphereGeometry(this.headpieceSize, 32, 32);
    const mesh = new THREE.Mesh(geometry, this.headpieceMaterial);
    mesh.position.y = this.shaftLength + this.headpieceSize; // Position on top of the shaft
    return mesh;
  }

  createStaffMesh() {
    const staffGroup = new THREE.Group();
    const shaftMesh = this.createShaft();
    const headpieceMesh = this.createHeadpiece();

    staffGroup.add(shaftMesh);
    staffGroup.add(headpieceMesh);

    // Center the staff vertically
    staffGroup.position.y = -this.shaftLength / 2 - this.headpieceSize;

    return staffGroup;
  }
}
module.exports = { Staff };