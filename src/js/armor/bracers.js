const THREE = require('three');

class Bracers {
  constructor(material = new THREE.MeshStandardMaterial()) {
    this.material = material;
    this.mesh = this.createBracersMesh();
  }

  createBracersMesh() {
    const mesh = new THREE.Group();
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32); // Basic forearm shape
    const leftArm = new THREE.Mesh(armGeometry, this.material);
    const rightArm = leftArm.clone();
    
    leftArm.position.set(-0.2, 0, 0); // Position left arm
    rightArm.position.set(0.2, 0, 0); // Position right arm
    
    mesh.add(leftArm);
    mesh.add(rightArm);

    return mesh;
  }
}

module.exports = { Bracers };