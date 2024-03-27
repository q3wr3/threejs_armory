const THREE = require('three');

class Axe {
  constructor({edgeLength, headWidth, headHeight, handleLength, handleDiameter, headMaterial, handleMaterial, doubleEdged = false, backType = 'flat'}) {
    this.edgeLength = edgeLength;
    this.headWidth = headWidth;
    this.headHeight = headHeight;
    this.handleLength = handleLength;
    this.handleDiameter = handleDiameter;
    this.headMaterial = headMaterial; // A Three.js material
    this.handleMaterial = handleMaterial; // A Three.js material
    this.doubleEdged = doubleEdged;
    this.backType = backType;
    this.mesh = this.createAxeMesh();
  }

  createHead() {
    const geometry = new THREE.BoxGeometry(this.headWidth, this.edgeLength, this.headHeight);
    const mesh = new THREE.Mesh(geometry, this.headMaterial);
    mesh.position.y = this.headHeight / 2 + this.handleLength; // Adjust based on the actual model dimensions
    // Customize the head based on doubleEdged and backType properties here
    return mesh;
  }

  createHandle() {
    const geometry = new THREE.CylinderGeometry(this.handleDiameter / 2, this.handleDiameter / 2, this.handleLength, 32);
    const mesh = new THREE.Mesh(geometry, this.handleMaterial);
    mesh.position.y = this.handleLength / 2; // Center the handle vertically
    return mesh;
  }

  createAxeMesh() {
    const axeGroup = new THREE.Group();
    const headMesh = this.createHead();
    const handleMesh = this.createHandle();

    axeGroup.add(headMesh);
    axeGroup.add(handleMesh);

    // Adjust the group's position so the bottom of the handle aligns with 'y = 0'
    axeGroup.position.y = -this.handleLength / 2;

    return axeGroup;
  }
}
module.exports = { Axe };