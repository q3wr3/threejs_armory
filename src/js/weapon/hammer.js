const THREE = require('three');

class Hammer {
  constructor(headLength, headWidth, headHeight, handleLength, handleDiameter, headMaterial, handleMaterial) {
    this.headLength = headLength;
    this.headWidth = headWidth;
    this.headHeight = headHeight;
    this.handleLength = handleLength;
    this.handleDiameter = handleDiameter;
    this.headMaterial = headMaterial; // A Three.js material
    this.handleMaterial = handleMaterial; // A Three.js material
    this.mesh = this.createHammerMesh();
  }

  createHead() {
    const geometry = new THREE.BoxGeometry(this.headLength, this.headWidth, this.headHeight);
    const mesh = new THREE.Mesh(geometry, this.headMaterial);
    mesh.position.y = this.headHeight / 2 + this.handleLength; // Position the head on top of the handle
    return mesh;
  }

  createHandle() {
    const geometry = new THREE.CylinderGeometry(this.handleDiameter / 2, this.handleDiameter / 2, this.handleLength, 32);
    const mesh = new THREE.Mesh(geometry, this.handleMaterial);
    mesh.position.y = this.handleLength / 2; // Center the handle vertically
    return mesh;
  }

  createHammerMesh() {
    const hammerGroup = new THREE.Group();
    const headMesh = this.createHead();
    const handleMesh = this.createHandle();

    hammerGroup.add(headMesh);
    hammerGroup.add(handleMesh);

    // Adjust the group's position so the bottom of the handle aligns with 'y = 0'
    hammerGroup.position.y = -this.handleLength / 2;

    return hammerGroup;
  }
}
module.exports = { Hammer };