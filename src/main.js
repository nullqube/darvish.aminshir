

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/Addons.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { log } from 'three/tsl';

function main() {
  initGUI();
}

function initGUI() {
  const gui = new GUI();
  function addObjectControls(gui, object, name) {
    const folder = gui.addFolder(`${name} Controls`);

    // --- Rotation ---
    const rotation = {
      x: object.rotation.x,
      y: object.rotation.y,
      z: object.rotation.z
    };

    folder.add(rotation, 'x', -Math.PI, Math.PI, 0.01)
      .name('Rotate X')
      .onChange(v => object.rotation.x = v);

    folder.add(rotation, 'y', -Math.PI, Math.PI, 0.01)
      .name('Rotate Y')
      .onChange(v => object.rotation.y = v);

    folder.add(rotation, 'z', -Math.PI, Math.PI, 0.01)
      .name('Rotate Z')
      .onChange(v => object.rotation.z = v);

    // --- Position ---
    const position = {
      x: object.position.x,
      y: object.position.y,
      z: object.position.z
    };

    folder.add(position, 'x', -10, 10, 0.01)
      .name('Position X')
      .onChange(v => object.position.x = v);

    folder.add(position, 'y', -10, 10, 0.01)
      .name('Position Y')
      .onChange(v => object.position.y = v);

    folder.add(position, 'z', -10, 10, 0.01)
      .name('Position Z')
      .onChange(v => object.position.z = v);

    // --- Scale ---
    const scale = {
      x: object.scale.x,
      y: object.scale.y,
      z: object.scale.z
    };

    folder.add(scale, 'x', 0.1, 10, 0.01)
      .name('Scale X')
      .onChange(v => object.scale.x = v);

    folder.add(scale, 'y', 0.1, 10, 0.01)
      .name('Scale Y')
      .onChange(v => object.scale.y = v);

    folder.add(scale, 'z', 0.1, 10, 0.01)
      .name('Scale Z')
      .onChange(v => object.scale.z = v);

    folder.open();
  }

  // Add controls for all parts
  addObjectControls(gui, screwNail, 'screw-nail');
  addObjectControls(gui, handle, 'Handle');
  addObjectControls(gui, handlePlastic, 'handel-plastic');
  addObjectControls(gui, body, 'body');

}
// Scene setup
const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// scene.background = new THREE.Color(0x00000);

// Camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
// camera.position.set(0, 0, 3);
// camera.lookAt(1,4,8)

// === CAMERA SETUP (using az/el) ===
const radius = 3;        // distance from target
const az = 0;            // azimuth: 0 = front view
const el = 50;           // elevation: +15° = slightly above, looking down

const azimuth = THREE.MathUtils.degToRad(az);
const elevation = THREE.MathUtils.degToRad(el);

const x = radius * Math.cos(elevation) * Math.sin(azimuth);
const y = radius * Math.sin(elevation);
const z = radius * Math.cos(elevation) * Math.cos(azimuth);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(x, y, z);
camera.lookAt(0, 0, 0); // 👈 look at origin (where your model is centered)


const LabelRenderer = new CSS2DRenderer();
LabelRenderer.setSize(window.innerWidth, window.innerHeight);
LabelRenderer.domElement.style.position = 'absolute';
LabelRenderer.domElement.style.top = '0';
document.body.appendChild(LabelRenderer.domElement);


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1.1;
// renderer.outputEncoding = THREE.sRGBEncoding;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputEncoding = THREE.sRGBEncoding;

// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1;
// renderer.physicallyCorrectLights = true;
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);
renderer.outputEncoding = THREE.sRGBEncoding;


// //light

// // ✅ Ambient light (soft base light)
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// // ✅ Directional Light (main light)
// const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
// dirLight.position.set(5, 5, 5);
// dirLight.castShadow = true;
// dirLight.shadow.bias = -0.0001;
// dirLight.shadow.mapSize.set(2048, 2048);
// scene.add(dirLight);

// // ✅ Spot Light for highlights
// const spotLight = new THREE.SpotLight(0xffffff, 1);
// spotLight.position.set(-3, 4, 2);
// spotLight.angle = Math.PI / 6;
// spotLight.penumbra = 0.5;
// spotLight.castShadow = true;
// scene.add(spotLight);

// // ✅ Helpers (optional)
// scene.add(new THREE.DirectionalLightHelper(dirLight, 2));
// scene.add(new THREE.SpotLightHelper(spotLight));



//lights
// const directionalLight = new THREE.DirectionalLight(0xffffff, .8);
// scene.add(directionalLight);
// directionalLight.position.set(6,3,0);
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,10);
// scene.add(dLightHelper);

// const spotLight = new THREE.SpotLight(0xffffff);
// scene.add(spotLight);
// spotLight.position.set(3,2,0);

// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// Lights
// scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.position.set(5, 10, 7.5);
// scene.add(dirLight);


// 💡 Better lighting setup
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333, 2);
// scene.add(hemiLight);

// const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
// dirLight.position.set(5, 10, 7);
// dirLight.castShadow = true;
// scene.add(dirLight);

// const fillLight = new THREE.PointLight(0xffffff, 1.2);
// fillLight.position.set(-5, 5, -5);
// scene.add(fillLight);

// // environment ligth
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// new THREE.TextureLoader().load('/textures/env.jpg', (texture) => {
//   const envMap = pmremGenerator.fromEquirectangular(texture).texture;
//   scene.environment = envMap;
//   texture.dispose();
//   pmremGenerator.dispose();
// });

// === Lights ===
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
// hemiLight.intensity = 0; // start off (dark)
// scene.add(hemiLight);

// const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
// dirLight.position.set(5, 10, 7.5);
// dirLight.intensity = 0; // start off
// scene.add(dirLight);

// const fillLight = new THREE.PointLight(0xffffff, 1.2);
// fillLight.position.set(-5, 5, -5);
// fillLight.intensity = 0; // start off
// scene.add(fillLight);

// scene.add(new THREE.AmbientLight(0xffffff, 0.0)); // ambient starts dark

// Ambient light (soft global illumination)


// --- *Lighting Setup* ---
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // soft global light
// scene.add(ambientLight);

// const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
// keyLight.position.set(5, 5, 5);
// keyLight.castShadow = true;
// scene.add(keyLight);

// const fillLight = new THREE.DirectionalLight(0xffffff, 1.6);
// fillLight.position.set(-5, 3, 2);
// scene.add(fillLight);

// const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
// rimLight.position.set(0, 3, -5);
// scene.add(rimLight);


// const keyLight = new THREE.RectAreaLight(0xffffff, 60, 2, 2);
// keyLight.position.set(2, 2, 2);
// keyLight.lookAt(0, 0, 0);
// scene.add(keyLight);

// const fillLight = new THREE.RectAreaLight(0xffffff, 15, 3, 3);
// fillLight.position.set(-2, 1.5, 1.5);
// fillLight.lookAt(0, 0, 0);
// scene.add(fillLight);

// const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
// rimLight.position.set(0, 2, -2);
// scene.add(rimLight);





// // Small ambient fill (just to avoid pitch-black areas)
// const ambient = new THREE.AmbientLight(0xffffff, 0.15);
// scene.add(ambient);

// // Key light — main visible source
// const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
// keyLight.position.set(4, 6, 3);
// keyLight.castShadow = true;
// scene.add(keyLight);

// // Fill light — softer and much lower intensity
// const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
// fillLight.position.set(-4, 3, 1);
// scene.add(fillLight);

// // Optional rim light for edge highlight
// const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
// rimLight.position.set(0, 3, -3);
// scene.add(rimLight);



// new RGBELoader()
//   .setPath('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/')
//   .load('studio_small_09_1k.hdr', (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = texture;
//     // scene.background = texture; // optional — for reflections only, you can comment this out
//   });



// const pmrem = new THREE.PMREMGenerator(renderer);
// new RGBELoader()
//   .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr', (hdr) => {
//     const envMap = pmrem.fromEquirectangular(hdr).texture;
//     scene.environment = envMap;
//     hdr.dispose();
//     pmrem.dispose();
//   });



// Remove old lights before adding new ones
scene.children = scene.children.filter(obj => !(obj.isLight));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(3, 3, 2);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-3, 2, -2);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
rimLight.position.set(-2, 5, 5);
scene.add(rimLight);


new RGBELoader()
  .setPath("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/")
  .load("studio_small_09_1k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = null;  // or keep a color if you want a white/grey backdrop
  });









// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  LabelRenderer.setSize(window.innerWidth, window.innerHeight);
});

// Load model
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(dracoLoader);





// loader.load(
//   '/models/GasValve3.glb',
//   (gltf) => {
//     const model = gltf.scene;
//     // console.log(model);
//     // model.traverse((child) => {
//     //   if (child.isMesh) {
//     //     child.castShadow = true;
//     //     child.receiveShadow = true;
//     //     if (child.material.map) child.material.map.encoding = THREE.sRGBEncoding;
//     //   }
//     // });


//   const handle = model.getObjectByName('Handel'); 


//   // console.log('Handle found:', handle);
//   // // handle.rotation.z = Math.PI / 2,







//   // if (handle) {
//   //   // Animate handle rotation (e.g., turning valve)
//   //   gsap.to(handle.rotation, {
//   //     z: Math.PI / 2,     // adjust axis as needed
//   //     duration: 2,
//   //     ease: "power2.inOut",
//   //     delay: 2            // start after the model rise animation
//   //   });
//   // }
//     // Scale first
//     model.scale.set(1.3, 1.3, 1.3);
//     model.rotation.set(0,90,0);

//     // Center the model in world space
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center); // Move model so its center is at origin



//     // Start position: below screen
//     model.position.y = -5;
//     model.rotation.x = Math.PI * 0.8; // Start tilted down
//     model.rotation.y = 0;             // Start facing forward

//     scene.add(model);

//     // --- Interactivity Setup ---
//  // ensure this name matches your GLB


//     const tl = gsap.timeline();

// // Model rise
// tl.to(model.position, { y: 0, duration: 2, ease: "power3.out" }, 0);

// // Rotation and scale
// tl.to(model.rotation, { x: 0, y: Math.PI / 4, duration: 2, ease: "power3.out" }, 0);
// tl.to(model.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 2, ease: "back.out(1.7)" }, 0);

// // 💡 Light fade in (starts halfway through the model animation)
// tl.to([hemiLight, dirLight, fillLight], {
//   intensity: (i, target) => {
//     if (target === dirLight) return 2.5;
//     if (target === fillLight) return 1.2;
//     return 1.2;
//   },
//   duration: 2,
//   ease: "power2.out"
// }, 1.0); // starts 1s after animation begins

//   },
//   undefined,
//   (err) => console.error('Error loading model:', err)
// );











// gsap.set('.brand-title', { opacity: 0, y: 80 });

// gsap.to('.brand-title', {
//   opacity: 1,
//   y: 0,
//   duration: 1.2,
//   ease: 'power3.out',
//   stagger: 0.25,
//   onComplete: startModelAnimation // 👈 when text animation finishes, run this
// });


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let model; // define globally so it’s accessible in the click handler
let handle;
let screw;
let body;

// function startModelAnimation() {
//   loader.load(
//   '/models/GasValve3.glb',
//   (gltf) => {
//     model = gltf.scene;
//     model.scale.set(1.3, 1.3, 1.3);
//     scene.add(model);
//     handle = model.getObjectByName('Handel'); 


//           // Scale first
//     model.scale.set(1.3, 1.3, 1.3);
//     model.rotation.set(0,90,0);

//     // Center the model in world space
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center); // Move model so its center is at origin



//     // Start position: below screen
//     model.position.y = -5;
//     model.rotation.x = Math.PI * 0.8; // Start tilted down
//     model.rotation.y = 0;             // Start facing forward

//     scene.add(model);

//     // --- Interactivity Setup ---
//  // ensure this name matches your GLB

//   const tl = gsap.timeline();

// // Model rise
// tl.to(model.position, { y: 0, duration: 2, ease: "power3.out" }, 0);

// // Rotation and scale
// tl.to(model.rotation, { x: 0, y: Math.PI / 4, duration: 2, ease: "power3.out" }, 0);
// tl.to(model.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 2, ease: "back.out(1.7)" }, 0);

// // 💡 Light fade in (starts halfway through the model animation)
// tl.to([hemiLight, dirLight, fillLight], {
//   intensity: (i, target) => {
//     if (target === dirLight) return 2.5;
//     if (target === fillLight) return 1.2;
//     return 1.2;
//   },
//   duration: 2,
//   ease: "power2.out"
// }, 1.0);

//   },
//   undefined,
//   (err) => console.error('Error loading model:', err)
// );
// }




// WaterValve(optimizie)2
// WaterValve(optimizie)23
// GasValve3
loader.load(
  '/models/gasvalve23.glb',
  (gltf) => {
    model = gltf.scene;
    // handle = model.getObjectByName('Handel');
    // body = model.getObjectByName("body");
    // screw = model.getObjectByName("screw");
    const ball = model.getObjectByName("ball");
    const washer1 = model.getObjectByName("washer1");
    const washer2 = model.getObjectByName("washer2");
    const screwNail = model.getObjectByName("screw-nail");
    const handle = model.getObjectByName("handel");
    const handlePlastic = model.getObjectByName("handel-plastic");
    const body = model.getObjectByName("body");
    const axesHelper = new THREE.AxesHelper(5); // size = 5 units
    scene.add(axesHelper);

    ball.scale.set(10, 10, 10);
    ball.rotation.set(1.44, 0.07, -2.42);
    washer1.scale.set(8, 8, 8);
    washer1.rotation.set(-0.16, 2.45, -0.81);
    washer1.position.set(-0.04, 0.15, 0.21);
    washer2.scale.set(8, 8, 8);
    washer2.rotation.set(0.21, -0.89, 3.11);
    washer2.position.set(0.14, 0.08, -0.02);








    //   model.traverse((child) => {
    //   if (child.isMesh && child.material) {
    //     child.material.metalness = 1;
    //     child.material.roughness = 0.35;
    //     if (child.material.map) child.material.map.encoding = THREE.sRGBEncoding;
    //   }
    // });




    model.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.metalness = 1;
        child.material.roughness = 0.3;
        if (child.material.map) child.material.map.encoding = THREE.sRGBEncoding;
      }
    });



    model.scale.set(1.3, 1.3, 1.3);
    model.rotation.set(0, 90, 0);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // Start position: below screen
    model.position.y = -5;
    model.position.x = 0
    model.rotation.x = Math.PI * 0.8;
    model.rotation.y = 0;
    scene.add(ball);
    scene.add(washer1);
    scene.add(washer2);
    scene.add(screwNail);

    // --- TEXT STARTS HIDDEN ---
    gsap.set(".brand-title", { y: 80 });

    // === MODEL ANIMATION TIMELINE ===
    const tl = gsap.timeline();

    // model rise + rotation + scale
    tl.to(model.position, { y: 0, duration: 2, ease: "power3.out" }, 0);
    tl.to(model.rotation, { x: 0, y: Math.PI / 4, duration: 2, ease: "power3.out" }, 0);
    tl.to(model.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 2, ease: "back.out(1.7)" }, 0);




    // === TEXT ANIMATION AFTER MODEL ===
    tl.to(".brand-title", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.25
    }, ">+0.02"); // ">" = start after everything else


    // === SCROLL ANIMATION ===
    gsap.registerPlugin(ScrollTrigger);
    // Start rotation (45°)
    model.rotation.set(0, Math.PI / 4, 0);

    // Rotate from 45° → 270°
    gsap.to(model.rotation, {
      y: Math.PI * 3, // 270° end angle
      ease: "none",
      scrollTrigger: {
        trigger: "#threejs-container",
        start: "top top",
        end: "bottom+=1500 top",
        scrub: true,
      }
    });






  },
  undefined,
  (err) => console.error("Error loading model:", err)
);


// loader.load(
//   '/models/gasvalve23.glb',
//   (gltf) => {
//     model = gltf.scene;
//     scene.add(model);

//     // --- Identify parts ---
//     const parts = [
//       model.getObjectByName("ball"),
//       model.getObjectByName("washer1"),
//       model.getObjectByName("washer2"),
//       model.getObjectByName("screw-nail"),
//       model.getObjectByName("Handel"),
//       model.getObjectByName("handel-plastic"),
//       model.getObjectByName("body"),
//     ].filter(Boolean);

//     // --- Material setup ---
//     model.traverse((child) => {
//       if (child.isMesh && child.material) {
//         child.material.metalness = 1;
//         child.material.roughness = 0.3;
//         if (child.material.map) child.material.map.encoding = THREE.sRGBEncoding;
//       }
//     });

//     // --- Center model ---
//     model.scale.set(1.3, 1.3, 1.3);
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center);
//     scene.add(model);

//     // --- TEXT STARTS HIDDEN ---
//     gsap.set(".brand-title", { y: 80 });

//     // === TIMELINE ===
//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//     // --- Store original transforms ---
//     const originalTransforms = parts.map(p => ({
//       part: p,
//       pos: p.position.clone(),
//       rot: p.rotation.clone(),
//     }));

//     // --- Set initial state (below + tilted) ---
//     originalTransforms.forEach(({ part, pos, rot }) => {
//       gsap.set(part.position, { x: pos.x, y: pos.y - 5, z: pos.z });
//       gsap.set(part.rotation, { x: Math.PI * 0.8, y: 0, z: 0 });
//       gsap.set(part.scale, { x: 1.3, y: 1.3, z: 1.3 });
//       part.visible = false;
//     });

//     // --- Sequential assembly ---
//     originalTransforms.forEach(({ part, pos, rot }, i) => {
//       tl.add(() => (part.visible = true), `>+${0.25}`);

//       tl.to(part.position, {
//         x: pos.x,
//         y: pos.y,
//         z: pos.z,
//         duration: 2,
//       }, "<");

//       tl.to(part.rotation, {
//         x: 0,
//         y: Math.PI / 4,
//         z: 0,
//         duration: 2,
//       }, "<");

//       tl.to(part.scale, {
//         x: 1.3,
//         y: 1.3,
//         z: 1.3,
//         duration: 2,
//         ease: "back.out(1.7)",
//       }, "<");
//     });

//     // --- Text fade in after assembly ---
//     tl.to(".brand-title", {
//       opacity: 1,
//       y: 0,
//       duration: 1.2,
//       ease: "power3.out",
//       stagger: 0.25,
//     }, ">+0.4");

//     // --- Scroll rotation ---
//     gsap.registerPlugin(ScrollTrigger);
//     gsap.to(model.rotation, {
//       y: Math.PI * 3,
//       ease: "none",
//       scrollTrigger: {
//         trigger: "#threejs-container",
//         start: "top top",
//         end: "bottom+=1500 top",
//         scrub: true,
//       },
//     });
//   },
//   undefined,
//   (err) => console.error("Error loading model:", err)
// );




function onMouseDown(event) {
  // 1️⃣ Convert mouse coords to normalized device coordinates
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 2️⃣ Update raycaster
  raycaster.setFromCamera(pointer, camera);

  // 3️⃣ Only test if the model is loaded
  if (model) {
    const intersections = raycaster.intersectObject(model, true);
    if (intersections.length > 0) {
      // find if any intersected object IS or is inside the handle
      const hitHandle = intersections.find(hit => hit.object === handle || handle.children.includes(hit.object));
      if (hitHandle) {
        toggleHandleAnimation(true);
      } else {
        toggleHandleAnimation(false);
      }
    } else {
      toggleHandleAnimation(false);
    }

  }
};

function toggleHandleAnimation(res) {
  if (!handle) return;

  if (res === true) {
    gsap.to(handle.rotation, {
      z: Math.PI / 2,
      duration: 1.5,
      ease: "power2.inOut"
    });
  } else {
    gsap.to(handle.rotation, {
      z: 0,
      duration: 1.5,
      ease: "power2.inOut"
    });
  }

}













function animate(time) {
  requestAnimationFrame(animate);
  controls.update();
  LabelRenderer.render(scene, camera);
  renderer.render(scene, camera);
}
animate();















