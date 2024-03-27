const THREE = require('three');

class Sabatons {
  constructor(material = new THREE.MeshStandardMaterial()) {
    this.material = material;
    this.mesh = this.createSabatonsMesh();
  }

  createSabatonsMesh() {
    const mesh = new THREE.Group();
    const footGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.3); // Basic foot shape
    const leftFoot = new THREE.Mesh(footGeometry, this.material);
    const rightFoot = leftFoot.clone();
    
    leftFoot.position.set(-0.15, 0, 0); // Position left foot
    rightFoot.position.set(0.15, 0, 0); // Position right foot
    
    mesh.add(leftFoot);
    mesh.add(rightFoot);

    return mesh;
  }
}
module.exports = { Sabatons };