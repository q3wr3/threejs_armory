const THREE = require('three');

class Helmet {
  constructor(size = 1, material = new THREE.MeshStandardMaterial(), shape = 'basic', features = {}) {
    this.size = size;
    this.material = material;
    this.shape = shape;
    this.features = features; // Additional features like visor, plume
    this.mesh = this.createHelmetMesh();
  }

  createHelmetMesh() {
    let geometry;
    let mesh = new THREE.Group(); // Use a Group to combine multiple parts (e.g., helmet body and visor)

    switch (this.shape) {
      case 'basic':
        geometry = new THREE.SphereGeometry(this.size, 32, 16);
        geometry.scale(1, 1.2, 1); // Slightly elongate the sphere for a more helmet-like shape
        const helmetBody = new THREE.Mesh(geometry, this.material);
        mesh.add(helmetBody);
        break;
      // Add cases for other shapes here
      default:
        geometry = new THREE.SphereGeometry(this.size, 32, 16); // Fallback to a basic sphere
        const defaultBody = new THREE.Mesh(geometry, this.material);
        mesh.add(defaultBody);
    }

    // Check for additional features and add them
    if (this.features.visor) {
      const visor = this.addVisor();
      mesh.add(visor); // Add the visor to the helmet group
    }

    return mesh;
  }

  addVisor() {
    // Simplified example of adding a visor
    const visorGeometry = new THREE.PlaneGeometry(this.size * 0.8, this.size * 0.5);
    visorGeometry.rotateX(-Math.PI / 2); // Rotate the visor to face forward
    const visorMesh = new THREE.Mesh(visorGeometry, this.material);

    // Position the visor appropriately
    visorMesh.position.set(0, this.size * 0.5, this.size * 0.6);

    return visorMesh;
  }
}


module.exports = { Helmet };