const THREE = require('three');

// Default materials
const defaultBladeMaterials = [
  new THREE.MeshStandardMaterial({ color: 0xC0C0C0 }), // Metal
  new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // Wood
  new THREE.MeshStandardMaterial({ color: 0x808080 })  // Stone
];

const defaultGuardMaterials = [
  new THREE.MeshStandardMaterial({ color: 0xC0C0C0 }), // Metal
  new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // Wood
  new THREE.MeshStandardMaterial({ color: 0x808080 })  // Stone
];

const defaultGripMaterials = [
  new THREE.MeshStandardMaterial({ color: 0xC0C0C0 }), // Metal
  new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // Wood
  new THREE.MeshStandardMaterial({ color: 0x808080 })  // Stone
];

class Sword {
  constructor(length, width, bladeMaterial, guardMaterial, gripMaterial) {
    this.length = length;
    this.width = width;
    this.bladeMaterial = bladeMaterial || this.getRandomMaterial(defaultBladeMaterials);
    this.guardMaterial = guardMaterial || this.getRandomMaterial(defaultGuardMaterials);
    this.gripMaterial = gripMaterial || this.getRandomMaterial(defaultGripMaterials);

      this.bladeBodyWidth


    this.mesh = this.createSwordMesh();
  }

  getRandomMaterial(materials) {
    return materials[Math.floor(Math.random() * materials.length)];
  }

  createBlade() {
    const bladeGeometry = new THREE.BufferGeometry();

    const randomInt = Math.floor(Math.random() * 19) + 2;

    // Generate a random float between 0.01 and 0.99
    const randomFloat = (Math.floor(Math.random() * 2) + 8)/10;


    let rndWidth = randomInt;
    let rndEdge = 22 - rndWidth;
    let rndEdgeStart = randomFloat;
    // Parameters for the blade
    const bodyLength = this.length - (this.length / 5); // Blade length
    const bodyWidth = this.width/rndWidth; // Blade width
    const bodyThickness = this.width / 20; // Thickness of the blade
    const edgeWidth = this.width/rndEdge; // Width of the edge
    const tipStart = bodyLength * rndEdgeStart;


    console.log(rndWidth,rndEdge,tipStart)
    // body width max = this.width/20
    // body width min = this.width/2

    // edge width max = this.width/2 - bodyWidth
    // edge width min = this.width/20 - bodyWidth

    // tip start min = 0.01
    // tip start max = 0.99


    // Tip starts at 90% of the blade length
    

    // Define vertices
    const vertices = [
        // Bottom face
        -bodyWidth / 2, 0, -bodyThickness / 2,    // 0: Left front bottom
        bodyWidth / 2, 0, -bodyThickness / 2,     // 1: Right front bottom
        -bodyWidth / 2, 0, bodyThickness / 2,     // 2: Left back bottom
        bodyWidth / 2, 0, bodyThickness / 2,      // 3: Right back bottom

        // Body top face
        -bodyWidth / 2, tipStart, -bodyThickness / 2,    // 4: Left front top
        bodyWidth / 2, tipStart, -bodyThickness / 2,     // 5: Right front top
        -bodyWidth / 2, tipStart, bodyThickness / 2,     // 6: Left back top
        bodyWidth / 2, tipStart, bodyThickness / 2,      // 7: Right back top

        // Edges running along the body length
        -(bodyWidth / 2 + edgeWidth), 0, 0,    // 8: Left front edge bottom
        (bodyWidth / 2 + edgeWidth), 0, 0,     // 9: Right front edge bottom
        -(bodyWidth / 2 + edgeWidth), tipStart, 0,    // 10: Left front edge top
        (bodyWidth / 2 + edgeWidth), tipStart, 0,     // 11: Right front edge top

        // Tip point
        0, bodyLength, 0,   // 12: Tip
    ];

    // Define faces using indices
    const indices = [
        // Bottom
        0, 1, 3,    0, 3, 2,

        // Top
        4, 5, 7,    4, 7, 6,

        // Front side
        4, 5, 0,    0, 5, 1,
        1, 5, 11,   1, 11, 9,
        0, 8, 10,   0, 10, 4,

        // Back side
        2, 7, 6,   2, 3, 7,
        3, 11, 7,   3,  9,11,
        2,  10, 8,  2,  6, 10,

        // Edges
        8, 9, 11,   8, 11, 10,

        // Tip triangles
        4, 10, 12,
        5, 12, 11,
        6, 12, 10,
        7, 11, 12,
        5, 4, 12,
        6, 7, 12,

    ];

    // Construct the geometry
    bladeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    bladeGeometry.setIndex(indices);

    // Create the mesh
    const bladeMesh = new THREE.Mesh(bladeGeometry, this.bladeMaterial);
    bladeMesh.position.y = -this.length / 2 + this.width * 0.05;

    return bladeMesh;
}



  createGuard() {
    const randomInt = (Math.floor(Math.random() * 10) + 10)/10;
    console.log(randomInt)
    const guardGeometry = new THREE.BoxGeometry(this.width/randomInt , this.width * 0.1, this.width * 0.1);
    const guardMesh = new THREE.Mesh(guardGeometry, this.guardMaterial);
    guardMesh.position.y = -this.length / 2;
    return guardMesh;
  }

  createGrip() {
    const gripLength = this.length / 8;
    const gripGeometry = new THREE.CylinderGeometry(this.width * 0.05, this.width * 0.05, gripLength, 8);
    const gripMesh = new THREE.Mesh(gripGeometry, this.gripMaterial);
    gripMesh.position.y = -this.length / 2 - gripLength / 2;
    return gripMesh;
  }


  createSwordMesh() {
    const swordGroup = new THREE.Group();
    const blade = this.createBlade();
    const guard = this.createGuard();
    const grip = this.createGrip();

    // Enable wireframe rendering for the blade material
    //blade.material.wireframe = true;

    // Create edge lines for the blade
    const bladeEdgesGeometry = new THREE.EdgesGeometry(blade.geometry);
    const bladeEdgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // Adjust color as needed
    const bladeEdges = new THREE.LineSegments(bladeEdgesGeometry, bladeEdgesMaterial);
    blade.add(bladeEdges); // Add edge lines to the blade mesh

    swordGroup.add(blade);
    swordGroup.add(guard);
    swordGroup.add(grip);

    console.log(swordGroup)
    return swordGroup;
  }
}

module.exports = Sword;
