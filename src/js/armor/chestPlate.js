const THREE = require('three');

class ChestPlate {
  constructor(size = 1, material = new THREE.MeshStandardMaterial()) {
    this.size = size;
    this.material = material;
    this.mesh = this.createChestPlateMesh();
  }

  createChestPlateMesh() {
    // Group to combine front and back plates
    const chestPlateGroup = new THREE.Group();

    // Front plate
    const frontGeometry = new THREE.BoxGeometry(this.size * 0.75, this.size, this.size * 0.25);
    const frontMesh = new THREE.Mesh(frontGeometry, this.material);
    frontMesh.position.z = this.size * 0.125; // Adjust position to sit at the character's front
    chestPlateGroup.add(frontMesh);

    // Back plate
    const backGeometry = new THREE.BoxGeometry(this.size * 0.75, this.size, this.size * 0.25);
    const backMesh = new THREE.Mesh(backGeometry, this.material);
    backMesh.position.z = -this.size * 0.125; // Adjust position to sit at the character's back
    chestPlateGroup.add(backMesh);

    // Adjustments for connecting points could be handled here if needed

    return chestPlateGroup;
  }

  // Additional methods for attachment points could be added here
}

module.exports = { ChestPlate };