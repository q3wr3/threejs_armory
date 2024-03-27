const THREE = require('three');

class Gauntlets {
  constructor(material = new THREE.MeshStandardMaterial()) {
    this.material = material;
    this.mesh = this.createGauntletsMesh();
  }

  createGauntletsMesh() {
    const mesh = new THREE.Group();
    const handGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.3); // Basic hand shape
    const leftHand = new THREE.Mesh(handGeometry, this.material);
    const rightHand = leftHand.clone();
    
    leftHand.position.set(-0.25, 0, 0); // Position left hand
    rightHand.position.set(0.25, 0, 0); // Position right hand
    
    mesh.add(leftHand);
    mesh.add(rightHand);

    return mesh;
  }
}

module.exports = { Gauntlets };