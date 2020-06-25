let camera, scene, renderer, geometry, textObject, text;
let wireframe = true

init();
animate();

function updateText(msg) {
  text = msg
  if (textObject) scene.remove(textObject)
  generateText(msg, (mesh) => { textObject = mesh; scene.add(mesh) })
}

function generateText(text, callback) {
  var loader = new THREE.FontLoader();
  loader.load('helvetiker.json', function (font) {
    geometry = new THREE.TextGeometry(text, {
      font: font,
      size: 5,
      height: 0.5,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 3
    });
    geometry.center();
    var material = new THREE.MeshNormalMaterial({ wireframe });
    var mesh = new THREE.Mesh(geometry, material);
    callback(mesh)
  });
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 50);
  camera.position.z = 20;
  scene.add(camera)

  updateText("Test")

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);


  light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 0, 1);
  camera.add(light);

  smokeTexture = THREE.ImageUtils.loadTexture('smoke.png');
  smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, opacity: 0.9, map: smokeTexture, transparent: true });
  smokeGeo = new THREE.PlaneGeometry(300, 300);
  smokeParticles = [];


  for (p = 0; p < 150; p++) {
    var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
    particle.rotation.z = Math.random() * 50;
    camera.add(particle);
    smokeParticles.push(particle);
  }

}


function evolveSmoke() {
  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += 0.08;
  }
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (textObject) {
    textObject.rotation.x += 0.02;
    textObject.rotation.y += 0.01;
  }
  evolveSmoke()
}
document.addEventListener("keyup", ({ key }) => {
  if (key === "Backspace") updateText("")
})
document.addEventListener("keypress", ({ key }) => {
  if (key.length === 1) updateText(text + key)
})
document.addEventListener("click", () => { wireframe = !wireframe; updateText(text) })