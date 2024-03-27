const THREE = require('three');

class Dagger {
  constructor(bladeLength, bladeWidth, handleLength, bladeMaterial, handleMaterial) {
    this.bladeLength = bladeLength;
    this.bladeWidth = bladeWidth;
    this.handleLength = handleLength;
    this.bladeMaterial = bladeMaterial; // A Three.js material for the blade
    this.handleMaterial = handleMaterial; // A Three.js material for the handle
    this.mesh = this.createDaggerMesh();
  }

  createBlade() {
    const geometry = new THREE.PlaneGeometry(this.bladeWidth, this.bladeLength);
    const mesh = new THREE.Mesh(geometry, this.bladeMaterial);
    mesh.position.y = this.bladeLength / 2; // Position the blade so its base is at the top of the handle
    return mesh;
  }

  createHandle() {
    const geometry = new THREE.CylinderGeometry(this.bladeWidth / 2, this.bladeWidth / 2, this.handleLength, 32);
    const mesh = new THREE.Mesh(geometry, this.handleMaterial);
    mesh.position.y = -this.handleLength / 2; // Position the handle so it connects to the base of the blade
    return mesh;
  }

  createDaggerMesh() {
    const daggerGroup = new THREE.Group();
    const bladeMesh = this.createBlade();
    const handleMesh = this.createHandle();

    daggerGroup.add(bladeMesh);
    daggerGroup.add(handleMesh);

    // Adjust the group's position so the bottom of the handle aligns with 'y = 0'
    daggerGroup.position.y = -this.handleLength;

    return daggerGroup;
  }
}
module.exports = { Dagger };