

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/Addons.js';
// import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
// import { traa } from 'three/examples/jsm/tsl/display/TRAANode.js';
// import gsap from 'gsap';
// import GUI from 'lil-gui';
// import { Reflector } from 'three/addons/objects/Reflector.js';
// import { PlaneGeometry } from 'three';


import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/RGBELoader.js';
import { CSS2DRenderer, CSS2DObject } from 'https://unpkg.com/three@0.160.0/examples/jsm/renderers/CSS2DRenderer.js';
import { mergeGeometries } from 'https://unpkg.com/three@0.160.0/examples/jsm/utils/BufferGeometryUtils.js';
import { Reflector } from 'https://unpkg.com/three@0.160.0/examples/jsm/objects/Reflector.js';

import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';


// import { initPreloader, onModelLoaded } from './preloader.js';







let camera;
let renderer;
let controls;
let loader;
let scene;
let gasValveParticles;
const threeContainer = document.getElementById('threejs-container');
const anatomyContainer = document.getElementById('model-anatomy');
const text1 = document.querySelectorAll(".text-page-1");
const pointer1 = document.querySelector(".pointer-1");
const pointer2 = document.querySelector(".pointer-2");
const pointer3 = document.querySelector(".pointer-3");
const pointer = document.querySelectorAll(".pointer");
const anatomyText = document.querySelectorAll(".anatomy-text");
const text3 = document.querySelectorAll(".text-page-3");
const companyName1 = document.querySelectorAll(".company-titel-name");
const companyNameWrapper = document.querySelectorAll(".company-titel-name-container");
const companyName2 = document.querySelectorAll(".company-titel-name2");
const companyNameWrapper2 = document.querySelectorAll(".company-titel-name2-container");
const companySubtitel = document.querySelectorAll(".company-sub-titel");
const test2 = document.querySelectorAll(".test-2");
const firstSlogan = document.querySelector(".hero-slogan-first-text");
const secondSlogan = document.querySelector(".hero-slogan-second-text");
 const thirdSlogan = document.querySelector(".hero-slogan-third-text");
const companyPrivetText = document.querySelector(".privet-company-text")
let istheobjectinthescene = true;
let model, handle, screw, ball;
let washer1, washer2, washer3, washer4, oring;
let screwNail, body, valveHead;
let isModelLoaded = false;
let scrollTriggers = []; // to kill/refresh later if needed
let isInTheAnatomy = false;
let gui
let transformGUI
let labelRenderer;

let anatomyLabels = [];

// ========= config ========

const desktop = {
  prepareModel:{
    scaleX:2.3,
    scaleY:2.3,
    scaleZ:2.3,
    positionX:-0.220000000000001,
    positionY:-1.28,
    positionZ:-0.0800000000000001,
    rotationX:51,
    rotationY:84.3,
    rotationZ:-22.2,
  },
  firstSection:{
    modelScaleX:2,
    modelScaleY:2,
    modelScaleZ:2,
    modelRotationY:90,
    modelPositionY:-0.33,
    handelRotationZ:1.5
  },
  page1:{
    modelScaleX:1.4,
    modelScaleY:1.4,
    modelScaleZ:1.4,
    modelPositionY:0.62,
    modelPositionZ:0.713031,
    modelRotationX:-0.1,
    modelRotationY:2.37,
    modelRotationZ:0.59,
  },
  page2:{
    modelPositionX:0.05,
    modelPositionY:0.45,
    modelPositionZ:0.9,
    modelRotationX:0.05,
    modelRotationY:2.21,
    modelRotationZ:0.05,
    screwPositionZ:-0.09,
    screwNailPositionZ:-0.05,
    screwNailRotationZ:3,
  }

}


// ================================
// RESET SCROLL BEFORE PAGE REFRESH
// ================================

let pageIsRefreshing = false;

window.addEventListener("beforeunload", () => {
  pageIsRefreshing = true;

  // Tell the next page load that we need to start from the top
  sessionStorage.setItem("resetScrollPosition", "true");

  // Move to first section immediately
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });
});


window.addEventListener("load", () => {

  if (sessionStorage.getItem("resetScrollPosition")) {

    sessionStorage.removeItem("resetScrollPosition");

    // Force start from first section
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });


    // Refresh GSAP ScrollTrigger calculations
    setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 500);

  }

});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {

  if (sessionStorage.getItem("comingToHome") !== "true") {
    return;
  }

  sessionStorage.removeItem("comingToHome");

  // Immediately go to top
  window.scrollTo(0, 0);

  // Wait for DOM / GSAP / mobile browser layout
  setTimeout(() => {

    window.scrollTo(0, 0);

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }

  }, 100);

  // Final correction
  setTimeout(() => {

    window.scrollTo(0, 0);

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }

  }, 500);

});

function main() {
  // Wait for scroll restoration

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initScene();
      // initGUI();
      initCamera(0, 50, 3);
      initRenderers();
      setupResize(); 
      initLights();
      initRgbeLoader();
      initControls();
      initLoaders();
      loadModel(); // ← animations created inside here
      animate();
      addGround();
    });
  });
}
main();

const mm = gsap.matchMedia();


function initScene() {
  return scene = new THREE.Scene();
}





function initCamera(az, el, radius) {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1173;
  const camRadius = isMobile ? 3.5 : radius;

  const azimuth = THREE.MathUtils.degToRad(az);
  const elevation = THREE.MathUtils.degToRad(el);

  const x = camRadius * Math.cos(elevation) * Math.sin(azimuth);
  const y = camRadius * Math.sin(elevation);
  const z = camRadius * Math.cos(elevation) * Math.cos(azimuth);

  camera = new THREE.PerspectiveCamera(
    // isMobile ? 55 : 45,
     isTablet ? 52 : (isMobile ? 65 : 45),
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );

  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);
}



function initRenderers() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;                // REQUIRED
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.appendChild(renderer.domElement);
  // manageCanvas();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   // -----------------------------
    // CSS LABEL RENDERER
    // -----------------------------

    labelRenderer = new CSS2DRenderer();


    labelRenderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    labelRenderer.domElement.style.position =
        "absolute";


    labelRenderer.domElement.style.top =
        "0px";


    labelRenderer.domElement.style.left =
        "0px";


    labelRenderer.domElement.style.pointerEvents =
        "none";


    threeContainer.appendChild(
        labelRenderer.domElement
    );
}






function initLights() {
 
  // Assuming you are using a DirectionalLight
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(5, 10, 5); // Move it up and to the side
light.castShadow = true; // <--- CRITICAL: Tell the light to cast shadows
light.shadow.radius = 6;

// Configure shadow quality (add this to prevent blurry/pixelated shadows)
light.shadow.mapSize.width = 2048; // High resolution
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;


scene.add(light);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
  rimLight.position.set(-2, 5, 5);
  scene.add(rimLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
scene.add(ambientLight, pointLight);


}



function initRgbeLoader() {
  new RGBELoader()
    .setPath("/hdris/")
    .load("studio_small_09_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = null;  // or keep a color if you want a white/grey backdrop
    });
}




// Controls
function initControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.enablePan = false;
}



function setupResize() {
  function resize() {
    if (!camera || !renderer) return;

    const w = window.innerWidth;
    const h = window.visualViewport?.height || window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(
      window.innerWidth,
      window.innerHeight
     );
  }

  window.addEventListener("resize", resize);
  window.visualViewport?.addEventListener("resize", resize);

  resize(); // initial call
}

// Load model
function initLoaders() {
  loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);
}


function addGround() {



  // 1. Create a flat plane geometry
const planeGeometry = new THREE.PlaneGeometry(50, 50); // Make it large enough

// 2. Use ShadowMaterial (it is completely invisible, except where shadows fall)
const planeMaterial = new THREE.ShadowMaterial({ 
    opacity: 0.08, // How dark the shadow should be (0 to 1)
    color: 0x000000 
});

const floor = new THREE.Mesh(planeGeometry, planeMaterial);

// 3. Rotate it to be flat on the ground
floor.rotation.x = -Math.PI / 2; 

// 4. Move it down so it sits just below your valve model
floor.position.y = -1; // Adjust this Y value to match the bottom of your model!

// 5. CRITICAL: The floor must RECEIVE the shadow
floor.receiveShadow = true; 

scene.add(floor);
  
}








function loadModel() {
  loader.load(
    '/models/new10.glb',
    (gltf) => {
      model = gltf.scene;

      // Extract parts by name (do it once)
      handle = model.getObjectByName('handel');
      screw = model.getObjectByName('screw');
      ball = model.getObjectByName('ball');
      washer1 = model.getObjectByName('washer1');
      washer2 = model.getObjectByName('washer2');
      screwNail = model.getObjectByName('screw-nail');
      body = model.getObjectByName('body');
      valveHead = model.getObjectByName('valve-head');
      // washer3 = model.getObjectByName('washer3');
      washer4 = model.getObjectByName('washer4');
      oring = model.getObjectByName('oring');




      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });


      prepareModel();
      addModelToScene(model, ball);
      createAnatomyLabels();
      createAllAnimations();
     
      
      
      
       
       hideLoader();
      // ← Now safe to create ScrollTriggers
      //  createMirrorAndClone(model);
      //  animateMirrorScaleOnSection2();
      // scrollAnimation(threeContainer,model)
      // createTransformGUI(model)
      // createTransformGUI(handle);
      createAllTransformGUI({
  model,
  handle,
  screw,
  ball,
  washer1,
  washer2,
  screwNail,
  body,
  valveHead
});

      isModelLoaded = true;

      

    },
    undefined,
    (err) => console.error("Error loading model:", err)
  );

}

function initGUI() {
  gui = new GUI({ title: 'Model Controls' });
  // gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '10px';
  gui.domElement.style.right = '10px';
}

function createAllTransformGUI(parts) {
  if (!gui) return;

  Object.entries(parts).forEach(([name, object]) => {
    if (!object) return;

    const folder = gui.addFolder(name);

    // Position
    folder.add(object.position, 'x', -10, 10, 0.01);
    folder.add(object.position, 'y', -10, 10, 0.01);
    folder.add(object.position, 'z', -10, 10, 0.01);

    // Rotation
    const rotation = {
      x: THREE.MathUtils.radToDeg(object.rotation.x),
      y: THREE.MathUtils.radToDeg(object.rotation.y),
      z: THREE.MathUtils.radToDeg(object.rotation.z),
    };

    folder.add(rotation, 'x', -180, 180, 0.1)
      .onChange(v => object.rotation.x = THREE.MathUtils.degToRad(v));

    folder.add(rotation, 'y', -180, 180, 0.1)
      .onChange(v => object.rotation.y = THREE.MathUtils.degToRad(v));

    folder.add(rotation, 'z', -180, 180, 0.1)
      .onChange(v => object.rotation.z = THREE.MathUtils.degToRad(v));

    // Scale
    folder.add(object.scale, 'x', 0.1, 5, 0.01);
    folder.add(object.scale, 'y', 0.1, 5, 0.01);
    folder.add(object.scale, 'z', 0.1, 5, 0.01);

    folder.open();
  });
}








  // ========= new version ==========
function prepareModel() {


   model.scale.set(desktop.prepareModel.scaleX,desktop.prepareModel.scaleY,desktop.prepareModel.scaleZ);
  // Center + scale
  // model.scale.set(2.3, 2.3, 2.3);
  // model.rotation.set(0, 90, 0);
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  // Initial hidden position (below)
  // model.position.y = -5;
  // model.position.x = 0;
  // model.position.z = 0;
  // model.rotation.x = Math.PI * 0.8;
  // model.rotation.y = 0;
  // model.rotation.z = 0;

    model.position.x = desktop.prepareModel.positionX;
    model.position.y = desktop.prepareModel.positionY;
    model.position.z = desktop.prepareModel.positionZ;
    model.rotation.x = THREE.MathUtils.degToRad(desktop.prepareModel.rotationX);
    model.rotation.y = THREE.MathUtils.degToRad(desktop.prepareModel.rotationY);
    model.rotation.z = THREE.MathUtils.degToRad(desktop.prepareModel.rotationZ);


  // Optional: clean materials (remove wireframe in production!)
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.metalness = 1;
      child.material.roughness = 0.3;
      // child.material.wireframe = true; // turn off in prod
      if (child.material.map) child.material.map.encoding = THREE.sRGBEncoding;
    }
  });
}

function addModelToScene(model, screw) {
  scene.add(model);
  // scene.add(screw);
}

// 4. All animations in one clean function
// function createAllAnimations() {
//  gsap.from(model.position, {
//   y: -5, // start hidden below
//   duration: 0.01,
//   scrollTrigger: {
//     trigger: ".front-page",
//     start: "top 90%",
//     end: "top 80%",
//     scrub: false,
//     once: true,
  
//     onEnter: () => {
//         gsap.timeline()
//         // .to(model.position, { y: -0.70, duration: 2, ease: "power3.out" }, 0)
//         // .to(model.rotation, { x: 0, y: Math.PI / 4, duration: 2, ease: "power3.out" }, 0)
//         .to(model.rotation, {  z:THREE.MathUtils.degToRad(-8.5), duration:4, ease: "power3.out" }, 0)
//         .to(handle.rotation,{z:THREE.MathUtils.degToRad(45), duration:4, ease: "power3.out"},0)
//         .to(model.rotation, {  y:THREE.MathUtils.degToRad(83.4), duration:4, ease: "power3.out" }, 0)
//          .to(companySubtitel ,{ top: "34%", duration:1.5, ease: "power3.out" },0)
//   },
//   onLeave: () => {
//    gsap.to(mirror.position, {y:10, duration: 2, ease: "power3.out"});

//   },
//   onEnterBack: () => {
//    gsap.to(mirror.position, {y:-0.52999, duration: 2, ease: "power3.out"});
//   },
//   onLeaveBack: () => {
//     gsap.to(mirror.position, {y:10, duration: 2, ease: "power3.out"});
//   }
//   }
// });

 


//   const firstsection1 = gsap.timeline({
//     scrollTrigger: {
//       trigger: test2,
//       start: "top 80%",
//       end: "bottom bottom",
//       scrub: 1.2,
//     }
//   })

//    const firstsection2 = gsap.timeline({
//     scrollTrigger: {
//       trigger:".test-3",
//       start: "top 80%",
//       end: "bottom bottom",
//       scrub: 1.2,
//     }
//   })

//    const firstsection3 = gsap.timeline({
//     scrollTrigger: {
//       trigger:".test-4",
//       start: "top 80%",
//       end: "bottom bottom",
//       scrub: 1.2,
//     }
//   })

//   const tlPage1Object = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-1",
//       start: "top 80%",
//       end: "bottom bottom",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//     }
//   });
//   const tlText1Enter = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-1",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping) // Avoid jump on load,
//     }
//   });
//   const tlText1Exit = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-1",
//       start: "bottom top",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)// Avoid jump on load,
//     }
//   });



//   const tlPage2Object = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-2",
//       start: "top center",
//       end: "bottom center",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//     }
//   });
//   const tlPage2Object2 = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-2",
//       start: "center top",
//       end: "bottom center",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//     }
//   });

//   const tlPage3 = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-3",
//       start: "top top",
//       end: "bottom center",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//     }
//   });

//   const tlText3Enter = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-3",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//       immediateRender: false, // Avoid jump on load,
//     }
//   });
//   const tlText3Exit = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-3",
//       start: "bottom top",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//       immediateRender: false,
//     }
//   });

//   const tlPage3Object = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-3",
//       start: "center center",
//       end: "bottom bottom",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//       immediateRender: false, // Avoid jump on load,
//     }
//   });

//   const tlAnatomy = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".anatomy",
//       start: "top 80%",
//       end: "bottom bottom",
//       scrub: 1.2,            // Add slight smoothing (number = seconds of damping)
//     }
//   });

//   const tlAnatomyExit = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".anatomy-exit",
//       start: "top 80%",
//       end: "bottom bottom",
//       scrub: 1.2, 
//       onEnter: () => showSection("anatomy-exit"),
// onLeave: () => hideSections(["anatomy-exit"]),
// onEnterBack: () => showSection("anatomy-exit"),
// onLeaveBack: () => hideSections(["anatomy-exit"]),          // Add slight smoothing (number = seconds of damping)
//     }
//   });

//   const tlPage4 = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page-4",
//       start: "top 40%",
//       end: "bottom center",
//       scrub: 1.2,
 

//     }
//   });




//   firstsection1.to(".test", {   "--stop": "0%",ease: "none", }, 0);
//   firstsection1.to(firstSlogan, {opacity:0,ease: "none", }, 0);
//   firstsection1.to(secondSlogan, {opacity:0,ease: "none", }, 0);
//   firstsection1.to(companyPrivetText, {opacity:0,ease: "none", }, 0);
//   firstsection1.to(".first-section-squre1", {opacity:0,ease: "none", }, 0);
//   firstsection1.to(".first-section-squre2", {opacity:0,ease: "none", }, 0);
//   firstsection1.to(".first-section-squre3", {opacity:0,ease: "none", }, 0);
//    firstsection1.to(".brand-name", {opacity:0,ease: "none", duration:1 }, 0);
//   firstsection1.to(model.scale, {x:desktop.firstSection.modelScaleX,z:desktop.firstSection.modelScaleY,y:desktop.firstSection.modelScaleZ,ease: "none",duration:2 }, 0);
//   firstsection1.to(model.rotation, {y:THREE.MathUtils.degToRad(desktop.firstSection.modelRotationY),ease: "none",duration:2 }, 0);
//   firstsection1.to(model.position, {y:getModelYPosition(),ease: "none",duration:2 }, 0);
//    firstsection1.to(handle.rotation, {z:THREE.MathUtils.degToRad(desktop.firstSection.handelRotationZ),ease: "none",duration:2 }, 0);

  


//   firstsection2.to(".test-4-h1", {opacity:1,ease: "none", }, 1);
//   firstsection2.to(".test-4-h1", {opacity:0,ease: "none", }, 8);
//   //  firstsection2.to(model.position, {y:getModelYPosition(),ease: "none", }, 0);


//  firstsection3.to(".test-4-h2", {opacity:1,ease: "none", }, 2);
//  firstsection3.to(".test-4-h2", {opacity:0,ease: "none", }, 8);

//   firstsection2.to(".test-4-h1-container", {opacity:1,ease: "none", }, 0);
//  firstsection3.to(".test-4-h1-container", {opacity:0,ease: "none", }, 8);


// const page1Model=Page1ObjectPosition()
//   // === PAGE1 === //

//        tlPage1Object.to(model.scale, { x:page1Model.x, y:page1Model.y, z:page1Model.z, duration: 2,ease: "none" }, 0);
//       tlPage1Object.to(model.position, { x:getModelXPosition(), y:desktop.page1.modelPositionY, z:desktop.page1.modelPositionZ, duration: 2,ease: "none" }, 0);
//       tlPage1Object.to(model.rotation, { x:desktop.page1.modelRotationX, y:desktop.page1.modelRotationY, z:desktop.page1.modelRotationZ, duration: 2, ease: "none"}, 0);
//       tlText1Enter.to(text1, { opacity:1, duration: 2,ease: "none", stagger:0.25 }, 0);
//       tlText1Enter.to(".product-info-container" , { opacity:1, duration: 2,ease: "none", stagger:0.25 }, 0);
//       tlText1Exit.to(text1 , { opacity:0, duration: 2,ease: "none", stagger:0.25 }, 0);
//       tlText1Exit.to(".product-info-container" , { opacity:0, duration: 2,ease: "none", stagger:0.25 }, 0);
 

//   // === PAGE2 === //

//        tlPage2Object.to(model.position,  {y:Page2ObjectPosition().y,x:desktop.page2.modelPositionX,z:desktop.page2.modelPositionZ, ease: "none" }, 0);
//       tlPage2Object.to(model.rotation,  { y:desktop.page2.modelRotationY, x:desktop.page2.modelRotationX, z:desktop.page2.modelRotationZ, ease: "none" }, 0);
//       tlPage2Object2.to(screw.position,  { z:desktop.page2.screwPositionZ, ease: "none" }, 0);
//       tlPage2Object2.to(screwNail.position,  { z:desktop.page2.screwNailPositionZ, ease: "none" }, 0);
//       tlPage2Object2.to(screwNail.rotation,  { z:desktop.page2.screwNailRotationZ, ease: "none" }, 0);



//   // === PAGE3 === // 

//        tlText3Enter.to(text3, { opacity:1, duration: 2,ease: "none", stagger:0.25 }, 0);
//         tlText3Enter.to(".product-info-container-2", { opacity:1, duration: 2,ease: "none", stagger:0.25 }, 0);
//       tlText3Exit.to(text3 , { opacity:0, duration: 2,ease: "none", stagger:0.25 }, 0);
//       tlText3Exit.to(".product-info-container-2" , { opacity:0, duration: 2,ease: "none", stagger:0.25 }, 0);
//       tlPage3Object.to(screw.position,  { z: -0.03939329460263252, ease: "none" }, 0);
//       tlPage3Object.to(screwNail.position,  { z:-0.017100008204579353, ease: "none" }, 0);

//   // === anatomy === //
// const ModelPosition = getModelPosition() 
// const rotation = getRotation();
// const position = getBodyEnterPosition();
// const positionExit = getBodyExitPosition();
// const position2 = getValveHeadEnterPosition();
// const positionExit2 = getValveHeadExitPosition();
//       // === anatomy === //
//       tlAnatomy.to(model.scale,{x:1.3,y:1.3,z:1.3,duration: 2,ease: "none"});
//          tlAnatomy.to(model.position,{x:ModelPosition.x,y:ModelPosition.y,z:ModelPosition.z,duration: 2,ease: "none"});
//          tlAnatomy.to(model.rotation,{x:THREE.MathUtils.degToRad(rotation.x),y:THREE.MathUtils.degToRad(rotation.y),z:THREE.MathUtils.degToRad(rotation.z),duration: 2,ease: "none"});
//            tlAnatomy.to(screw.position,{z:-0.0999999999999996,ease: "none"},6);
//            tlAnatomy.to(screw.rotation,{z:42.8,ease: "none"},6);
//             tlAnatomy.to(screwNail.position,{z:-0.04,ease: "none"},6);
//            tlAnatomy.to(screwNail.rotation,{z:180,ease:"none"},6);
//                tlAnatomy.to(handle.position,{z:-0.08,ease: "none"},6);
//                tlAnatomy.to(body.position,{x:position.x,y:position.y,z:position.z,ease: "none"},6);
//                tlAnatomy.to(valveHead.position,{x:position2.x,y:position2.y,z:position2.z,ease: "none"},6);
//                   tlAnatomy.to(washer1.position,{x:0.0600000000000005,ease: "none"},6);
//                    tlAnatomy.to(washer2.position,{x:0.0199999999999996,ease: "none"},6);



//   // // === anatomy-exit === //
  
//      tlAnatomyExit.to(screw.position,{z:-0.03939329460263252,ease: "none",duration:2},9);
//      tlAnatomyExit.to(screw.rotation,{z:-60.07620173045744,ease: "none",duration:2},9);
//      tlAnatomyExit.to(screwNail.position,{z:-0.017100008204579353,ease: "none",duration:2},9);
//      tlAnatomyExit.to(screwNail.rotation,{z:0,ease:"none",duration:2},9);
//      tlAnatomyExit.to(handle.position,{z:-0.0336117260158062,ease: "none",duration:2},9);
//      tlAnatomyExit.to(body.position,{x:positionExit.x,y:positionExit.y,z:positionExit.z,ease: "none",duration:2},9);
//       tlAnatomyExit.to(valveHead.position,{x:positionExit2.x,y:positionExit2.y,z:positionExit2.z,ease: "none",duration:2},9);
//      tlAnatomyExit.to(washer1.position,{x:0.0502999946475029,ease: "none",duration:2},9);
//      tlAnatomyExit.to(washer2.position,{x:0.0600000000000005,ease: "none",duration:2},9);



//   // === PAGE4 === //

//       tlPage4.to(model.position, { y: -5, duration: 2 }, 0);
//       tlPage4.to(model.rotation, { x: 0, y: 0, duration: 2, }, 0);



// }











// =============================================================
//  MASTER TIMELINE  (one ScrollTrigger drives everything)
//  Master time = scroll pixels, so every section keeps exactly
//  the same scroll start/end it had before. Each old timeline
//  is stretched to its old scroll range and nested in the master.
// =============================================================

let masterTL = null;

// Read the real scroll start/end of a trigger (same math ScrollTrigger uses)
function getRange(trigger, start, end) {
  const config = { trigger, start };
  if (end !== undefined) config.end = end;
  const st = ScrollTrigger.create(config);
  const range = { start: st.start, end: st.end };
  st.kill();
  return range;
}

// Stretch a timeline to its old scroll range and place it on the master
// minPx: ranges with start === end (e.g. "bottom top" with no end) get a tiny range
function addSection(master, tl, trigger, start, end, minPx = 1) {
  const r = getRange(trigger, start, end);
  const len = Math.max(r.end - r.start, minPx);
  tl.duration(len);          // keeps all inner positions proportional
  master.add(tl, r.start);   // starts at the same scroll position as before
}

// -------------------------------------------------------------
//  Intro (time based, NOT scrubbed) - stays separate, unchanged
// -------------------------------------------------------------
function createIntroAnimation() {
  gsap.from(model.position, {
    y: -5, // start hidden below
    duration: 0.01,
    scrollTrigger: {
      trigger: ".front-page",
      start: "top 90%",
      end: "top 80%",
      scrub: false,
      once: true,

      onEnter: () => {
        gsap.timeline()
          .to(model.rotation, { z: THREE.MathUtils.degToRad(-8.5), duration: 4, ease: "power3.out" }, 0)
          .to(handle.rotation, { z: THREE.MathUtils.degToRad(45), duration: 4, ease: "power3.out" }, 0)
          .to(model.rotation, { y: THREE.MathUtils.degToRad(83.4), duration: 4, ease: "power3.out" }, 0)
          .to(companySubtitel, { top: "34%", duration: 1.5, ease: "power3.out" }, 0);
      },
      onLeave: () => {
        gsap.to(mirror.position, { y: 10, duration: 2, ease: "power3.out" });
      },
      onEnterBack: () => {
        gsap.to(mirror.position, { y: -0.52999, duration: 2, ease: "power3.out" });
      },
      onLeaveBack: () => {
        gsap.to(mirror.position, { y: 10, duration: 2, ease: "power3.out" });
      }
    }
  });
}

// -------------------------------------------------------------
//  Master scrub timeline
// -------------------------------------------------------------
function createMasterTimeline() {
  // clean rebuild (resets values back to start before killing)
  if (masterTL) {
    masterTL.progress(0);
    masterTL.scrollTrigger && masterTL.scrollTrigger.kill();
    masterTL.kill();
  }

  const maxScroll = ScrollTrigger.maxScroll(window);

  const master = gsap.timeline({
    scrollTrigger: {
      start: 0,
      end: () => master.duration(), // 1 time unit = 1 scroll pixel
      scrub: 1.2,
       immediateRender: false,                   // same smoothing as before
      invalidateOnRefresh: true,
    }
  });

  // spacer so the master is at least as long as the page
  master.to({}, { duration: maxScroll, ease: "none" }, 0);

  // ---------------- FIRST SECTION ----------------
  const firstsection1 = gsap.timeline();
  const firstsection2 = gsap.timeline();
  const firstsection3 = gsap.timeline();

  firstsection1.to(".test", { "--stop": "0%", ease: "none" }, 0);
  firstsection1.to(firstSlogan, { opacity: 0, ease: "none" }, 0);
  firstsection1.to(secondSlogan, { opacity: 0, ease: "none" }, 0);
  firstsection1.to(thirdSlogan, { opacity: 0, ease: "none" }, 0);
  firstsection1.to(companyPrivetText, { opacity: 0, ease: "none" }, 0);
  firstsection1.to(".first-section-squre1", { opacity: 0, ease: "none" }, 0);
  firstsection1.to(".first-section-squre2", { opacity: 0, ease: "none" }, 0);
  firstsection1.to(".first-section-squre3", { opacity: 0, ease: "none" }, 0);
  firstsection1.to(".brand-name", { opacity: 0, ease: "none", duration: 1 }, 0);
  firstsection1.to(model.scale, { x: desktop.firstSection.modelScaleX, z: desktop.firstSection.modelScaleY, y: desktop.firstSection.modelScaleZ, ease: "none", duration: 2 }, 0);
  firstsection1.to(model.rotation, { y: THREE.MathUtils.degToRad(desktop.firstSection.modelRotationY), ease: "none", duration: 2 }, 0);
  firstsection1.to(model.position, { y: getModelYPosition(), ease: "none", duration: 2 }, 0);
  firstsection1.to(handle.rotation, { z: THREE.MathUtils.degToRad(desktop.firstSection.handelRotationZ), ease: "none", duration: 2 }, 0);

  firstsection2.to(".test-4-h1", { opacity: 1, ease: "none" }, 1);
  firstsection2.to(".test-4-h1", { opacity: 0, ease: "none" }, 8);
  firstsection2.to(".test-4-h1-container", { opacity: 1, ease: "none" }, 0);

  firstsection3.to(".test-4-h2", { opacity: 1, ease: "none" }, 2);
  firstsection3.to(".test-4-h2", { opacity: 0, ease: "none" }, 8);
  firstsection3.to(".test-4-h1-container", { opacity: 0, ease: "none" }, 8);

  addSection(master, firstsection1, test2, "top 80%", "bottom bottom");
  addSection(master, firstsection2, ".test-3", "top 80%", "bottom bottom");
  addSection(master, firstsection3, ".test-4", "top 80%", "bottom bottom");

  // ---------------- PAGE 1 ----------------
  const page1Model = Page1ObjectPosition();

  const tlPage1Object = gsap.timeline();
  const tlText1Enter = gsap.timeline();
  const tlText1Exit = gsap.timeline();

  tlPage1Object.to(model.scale, { x: page1Model.x, y: page1Model.y, z: page1Model.z, duration: 2, ease: "none" }, 0);
  tlPage1Object.to(model.position, { x: getModelXPosition(), y: desktop.page1.modelPositionY, z: desktop.page1.modelPositionZ, duration: 2, ease: "none" }, 0);
  tlPage1Object.to(model.rotation, { x: desktop.page1.modelRotationX, y: desktop.page1.modelRotationY, z: desktop.page1.modelRotationZ, duration: 2, ease: "none" }, 0);
  tlText1Enter.to(text1, { opacity: 1, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlText1Enter.to(".product-info-container", { opacity: 1, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlText1Exit.to(text1, { opacity: 0, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlText1Exit.to(".product-info-container", { opacity: 0, duration: 2, ease: "none", stagger: 0.25 }, 0);

  addSection(master, tlPage1Object, ".page-1", "top 80%", "bottom bottom");
  addSection(master, tlText1Enter, ".page-1", "top top", "bottom bottom");
  addSection(master, tlText1Exit, ".page-1", "bottom top");

  // ---------------- PAGE 2 ----------------
  const tlPage2Object = gsap.timeline();
  const tlPage2Object2 = gsap.timeline();

  tlPage2Object.to(model.position, { y: Page2ObjectPosition().y, x: desktop.page2.modelPositionX, z: desktop.page2.modelPositionZ, ease: "none" }, 0);
  tlPage2Object.to(model.rotation, { y: desktop.page2.modelRotationY, x: desktop.page2.modelRotationX, z: desktop.page2.modelRotationZ, ease: "none" }, 0);
  tlPage2Object2.to(screw.position, { z: desktop.page2.screwPositionZ, ease: "none" }, 0);
  tlPage2Object2.to(screwNail.position, { z: desktop.page2.screwNailPositionZ, ease: "none" }, 0);
  tlPage2Object2.to(screwNail.rotation, { z: desktop.page2.screwNailRotationZ, ease: "none" }, 0);

  addSection(master, tlPage2Object, ".page-2", "top center", "bottom center");
  addSection(master, tlPage2Object2, ".page-2", "center top", "bottom center");

  // ---------------- PAGE 3 ----------------
  const tlText3Enter = gsap.timeline();
  const tlText3Exit = gsap.timeline();
  const tlPage3Object = gsap.timeline();

  tlText3Enter.to(text3, { opacity: 1, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlText3Enter.to(".product-info-container-2", { opacity: 1, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlText3Exit.to(text3, { opacity: 0, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlText3Exit.to(".product-info-container-2", { opacity: 0, duration: 2, ease: "none", stagger: 0.25 }, 0);
  tlPage3Object.to(screw.position, { z: -0.03939329460263252, duration: 2, ease: "none" }, 0);
  tlPage3Object.to(screwNail.position, { z: -0.017100008204579353, duration: 2 ,ease: "none" }, 0);

  addSection(master, tlText3Enter, ".page-3", "top top", "bottom bottom");
  addSection(master, tlText3Exit, ".page-3", "bottom top");
  addSection(master, tlPage3Object, ".page-3", "center center","bottom bottom");

  // ---------------- ANATOMY ----------------
  const ModelPosition = getModelPosition();
  const rotation = getRotation();
  const position = getBodyEnterPosition();
  const positionExit = getBodyExitPosition();
  const position2 = getValveHeadEnterPosition();
  const positionExit2 = getValveHeadExitPosition();

  const tlAnatomy = gsap.timeline();
  tlAnatomy.to(model.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 2, ease: "none" });
  tlAnatomy.to(model.position, { x: ModelPosition.x, y: ModelPosition.y, z: ModelPosition.z, duration: 2, ease: "none" });
  tlAnatomy.to(model.rotation, { x: THREE.MathUtils.degToRad(rotation.x), y: THREE.MathUtils.degToRad(rotation.y), z: THREE.MathUtils.degToRad(rotation.z), duration: 2, ease: "none" });
  tlAnatomy.to(screw.position, { z: -0.0999999999999996, ease: "none" }, 6);
  tlAnatomy.to(screw.rotation, { z: 42.8, ease: "none" }, 6);
  tlAnatomy.to(screwNail.position, { z: -0.04, ease: "none" }, 6);
  tlAnatomy.to(screwNail.rotation, { z: 180, ease: "none" }, 6);
  tlAnatomy.to(handle.position, { z: -0.08, ease: "none" }, 6);
  tlAnatomy.to(body.position, { x: position.x, y: position.y, z: position.z, ease: "none" }, 6);
  tlAnatomy.to(valveHead.position, { x: position2.x, y: position2.y, z: position2.z, ease: "none" }, 6);
  tlAnatomy.to(washer1.position, { x: 0.0600000000000005, ease: "none" }, 6);
  tlAnatomy.to(washer2.position, { x: 0.0199999999999996, ease: "none" }, 6);

  // ---------------- ANATOMY EXIT ----------------
  const tlAnatomyExit = gsap.timeline();
  tlAnatomyExit.to(screw.position, { z: -0.03939329460263252, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(screw.rotation, { z: -60.07620173045744, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(screwNail.position, { z: -0.017100008204579353, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(screwNail.rotation, { z: 0, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(handle.position, { z: -0.0336117260158062, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(body.position, { x: positionExit.x, y: positionExit.y, z: positionExit.z, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(valveHead.position, { x: positionExit2.x, y: positionExit2.y, z: positionExit2.z, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(washer1.position, { x: 0.0502999946475029, ease: "none", duration: 2 }, 9);
  tlAnatomyExit.to(washer2.position, { x: 0.0600000000000005, ease: "none", duration: 2 }, 9);

  addSection(master, tlAnatomy, ".anatomy", "top 80%", "bottom bottom");
  addSection(master, tlAnatomyExit, ".anatomy-exit", "top 80%", "bottom bottom");

  // ---------------- PAGE 4 ----------------
  const tlPage4 = gsap.timeline();
  tlPage4.to(model.position, { y: -5, duration: 2 }, 0);
  tlPage4.to(model.rotation, { x: 0, y: 0, duration: 2 }, 0);

  addSection(master, tlPage4, ".page-4", "top 40%", "bottom center");

  masterTL = master;
  return master;
}

// -------------------------------------------------------------
//  Show / hide callbacks (can't live inside a nested timeline,
//  so they stay as a tiny animation-free ScrollTrigger)
// -------------------------------------------------------------
function createSectionCallbacks() {
  ScrollTrigger.create({
    trigger: ".anatomy-exit",
    start: "top 80%",
    end: "bottom bottom",
    onEnter: () => showSection("anatomy-exit"),
    onLeave: () => hideSections(["anatomy-exit"]),
    onEnterBack: () => showSection("anatomy-exit"),
    onLeaveBack: () => hideSections(["anatomy-exit"]),
  });
}

// -------------------------------------------------------------
//  Entry point (replaces createAllAnimations)
// -------------------------------------------------------------
function createAllAnimations() {
  createIntroAnimation();
  createMasterTimeline();
  createSectionCallbacks();

  // rebuild when layout changes so scroll ranges stay correct
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createMasterTimeline();
      ScrollTrigger.refresh();
    }, 250);
  });
}
// particels 



gsap.registerPlugin(ScrollTrigger);


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







// function animate(time) {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }

function animate(time){


requestAnimationFrame(
animate
);



controls.update();



renderer.render(
scene,
camera
);



labelRenderer.render(
scene,
camera
);


}



// Animate all even items together with one ScrollTrigger

// Select all target elements
if (window.innerWidth > 833) {
  const productElements = document.querySelectorAll(".card:nth-child(2n)");

  gsap.to(productElements, {
    y: 0,
    duration: .5,
    ease: "none",
    scrollTrigger: {
      trigger: ".product-wrapper",
      start: "top bottom",   // when top of .product-wrapper hits bottom of viewport
      end: "bottom top",     // when bottom of .product-wrapper hits top of viewport
      scrub: true,
      // markers: true // for debugging
    }
  });
}


// < --- card-animation --->



let progress;
let li1 = document.querySelector('.li-1');
let li2 = document.querySelector('.li-2');
let li3 = document.querySelector('.li-3');
let companyWrapper = document.querySelector('.company-purpose-text-wrapper');
let div1 = document.querySelector('.div-1');
let div2 = document.querySelector('.div-2');
let div3 = document.querySelector('.div-3');
let companyTitel = document.querySelector(".company-purpose-li-titel");
let companyImage = document.querySelector(".company-purpose-img");
let companyNumber = document.querySelector(".company-purpose-number");
let companySvg = document.querySelector(".company-purpose-li-svg");

let companyTitel2 = document.querySelector(".company-purpose-li-titel2");
let companyImage2 = document.querySelector(".company-purpose-img2");
let companyNumber2 = document.querySelector(".company-purpose-number2");
let companySvg2 = document.querySelector(".company-purpose-li-svg2");

let companyTitel3 = document.querySelector(".company-purpose-li-titel3");
let companyImage3 = document.querySelector(".company-purpose-img3");
let companyNumber3 = document.querySelector(".company-purpose-number3");
let companySvg3 = document.querySelector(".company-purpose-li-svg3");

const section = document.querySelector('.company-purpose-container');
function getSectionScrollProgress(section) {
  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const start = viewportHeight;
  const end = -rect.height;

  const progress = (start - rect.top) / (start - end);

  return Math.min(Math.max(progress, 0), 1);
}

const translateYPic = -100;
const translateY = -7;
const translateY2= window.innerWidth < 555 ? -35 : -28;
// const translateY3 = window.innerWidth < 403 ? -51 : window.innerWidth < 555 ? -75 : -58;
const translateY3 =
  window.innerWidth <= 376 ? -61 :
  window.innerWidth < 403 ? -51 :
  window.innerWidth < 555 ? -52 :
  -58;
window.addEventListener('scroll', () => {
  progress = getSectionScrollProgress(section);
  console.log(progress); // 0 → 1 within this section
  li1.style.opacity = '0.3';
  li2.style.opacity = '0.3';
  li3.style.opacity = '0.3';

  // div1.style.transform = 'translateY(0)';
  // div2.style.transform = 'translateY(0)';
  div1.style.transform = 'translateY(0)';
  div2.style.transform = 'translateY(0)';
  div3.style.transform = 'translateY(0)';

  if (progress > 0.2 && progress < 0.4) {
    li1.style.opacity = '1';
    companyWrapper.style.transform = `translateY(${translateY}rem)`;

    companyTitel.classList.add("fade-in");
    companyImage.classList.add("fade-in");
    companyNumber.classList.add("fade-in");
    companySvg.classList.add("rotate-in");

    companyTitel2.classList.remove("fade-in");
    companyImage2.classList.remove("fade-in");
    companyNumber2.classList.remove("fade-in");
    companySvg2.classList.remove("rotate-in");

    companyTitel3.classList.remove("fade-in");
    companyImage3.classList.remove("fade-in");
    companyNumber3.classList.remove("fade-in");
    companySvg3.classList.remove("rotate-in");

  } else if (progress > 0.4 && progress < 0.6) {
    li2.style.opacity = '1';
    companyWrapper.style.transform = `translateY(${translateY2}rem)`;
    div1.style.transform = `translateY(${translateYPic}vh)`;
    div2.style.transform = `translateY(${translateYPic}vh)`;

    companyTitel.classList.remove("fade-in");
    companyImage.classList.remove("fade-in");
    companyNumber.classList.remove("fade-in");
    companySvg.classList.remove("rotate-in");

    companyTitel2.classList.add("fade-in");
    companyImage2.classList.add("fade-in");
    companyNumber2.classList.add("fade-in");
    companySvg2.classList.add("rotate-in");

    companyTitel3.classList.remove("fade-in");
    companyImage3.classList.remove("fade-in");
    companyNumber3.classList.remove("fade-in");
    companySvg3.classList.remove("rotate-in");


  } else if (progress >= 0.6) {
    li3.style.opacity = '1';
    companyWrapper.style.transform = `translateY(${translateY3}rem)`;
    div3.style.transform = `translateY(${translateYPic * 2}vh)`;

    companyTitel.classList.remove("fade-in");
    companyImage.classList.remove("fade-in");
    companyNumber.classList.remove("fade-in");
    companySvg.classList.remove("rotate-in");

    companyTitel2.classList.remove("fade-in");
    companyImage2.classList.remove("fade-in");
    companyNumber2.classList.remove("fade-in");
    companySvg2.classList.remove("rotate-in");

    companyTitel3.classList.add("fade-in");
    companyImage3.classList.add("fade-in");
    companyNumber3.classList.add("fade-in");
    companySvg3.classList.add("rotate-in");


  }
});


const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
  <path d="M0 0L10 0 M0 0L0 10"
        stroke="white"
        stroke-dasharray="2 2"
        stroke-width="1"
        fill="none"/>
</svg>
`;

const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;




gsap.fromTo(
  ".line",
  { backgroundPositionY: "1263.61px" },
  {
    backgroundPositionY: "2592.45px",
    ease: "none",
    duration: 2,
    scrollTrigger: {
      trigger: ".company-purpose-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  }
);





const faqs = document.querySelectorAll(".faq-item");

faqs.forEach((faq) => {
  faq.querySelector(".faq-question").addEventListener("click", () => {
    faqs.forEach((item) => {
      if (item !== faq) item.classList.remove("active");
    });
    faq.classList.toggle("active");
  });
});


function createAnatomyLabels() {
  createAnatomyLabel(body, "بدنه", "anatomy-exit");
  createAnatomyLabel(handle, "دسته", "anatomy-exit");
  createAnatomyLabel(screw, "مهره واشر دار", "anatomy-exit");
  createAnatomyLabel(screwNail, "ساقه", "anatomy-exit");
  createAnatomyLabel(washer1, "تفلون", "anatomy-exit");
  createAnatomyLabel(washer2, "تفلون", "anatomy-exit");
  createAnatomyLabel(ball, "توپی", "anatomy-exit");
  createAnatomyLabel(valveHead, "کلاهک", "anatomy-exit");
  // createAnatomyLabel(washer3, "واشر", "anatomy-exit");
  createAnatomyLabel(washer4, "واشر", "anatomy-exit");
  createAnatomyLabel(oring, "اورینگ", "anatomy-exit");
}

const anatomyLabelsBySection = new Map();



function createAnatomyLabel(object, title, section) {
  const div = document.createElement("div");
  div.className = "anatomy-label";
  div.innerHTML = `
    <div class="label-content">

      <span>${title}</span>
    </div>
  `;

  const label = new CSS2DObject(div);
  label.visible = false;   // ← start hidden
  object.add(label);

  if (!anatomyLabelsBySection.has(section)) {
    anatomyLabelsBySection.set(section, []);
  }
  anatomyLabelsBySection.get(section).push(label);

  return label;
}



function showSection(section) {
    const labels = anatomyLabelsBySection.get(section);
    if (!labels) return;

    labels.forEach(label => {
        label.visible = true;
    });
}

function hideSections(sections) {
    sections.forEach(section => {
        const labels = anatomyLabelsBySection.get(section);

        if (!labels) return;

        labels.forEach(label => {
            label.visible = false;
        });
    });
}

function fadeInSection(section) {
  const labels = anatomyLabelsBySection.get(section);
  if (!labels) return;
  labels.forEach((label, i) => {
    gsap.to(label.element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: "power3.out"
    });
  });
}

function fadeOutSection(section) {
  const labels = anatomyLabelsBySection.get(section);
  if (!labels) return;
  labels.forEach((label, i) => {
    gsap.to(label.element, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: i * 0.1,
      ease: "power3.in"
    });
  });
}

console.log("pointer: "+ pointer)







function hideLoader() {
  const loaderScreen = document.querySelector('#loader');
  if (!loaderScreen) return;

  // Minimum display time (e.g., 3s) to let the shine complete at least once
  const minimumTime = 3000;
  const startTime = performance.now();

  function fadeOutLoader() {
    gsap.to(loaderScreen, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => { loaderScreen.remove()
         ScrollTrigger.refresh();
      }
    });
  }

  const elapsed = performance.now() - startTime;
  if (elapsed >= minimumTime) {
    fadeOutLoader();
  } else {
    setTimeout(fadeOutLoader, minimumTime - elapsed);
  }
}

function getModelXPosition() {
  const width = window.innerWidth;

  if (width < 768) { // mobile
    return -0.25;
  } else if (width < 1024) { // tablet
    return -0.55;
  } else { // desktop
    return -0.79;
  }
}


function getRotation() {
  const width = window.innerWidth;

  if (width < 768) {
    return {
      x: -32.6,
      y: 3.8,
      z: -0.2
    };
  }

  // if (width < 1024) {
  //   return {
  //     x: -15,
  //     y: 12,
  //     z: 20
  //   };
  // }

  return {
    // x: -19.1,
    // y: 17.6,
    // z: 25.1
    x: -32.6,
    y: 3.8,
    z: -0.2
    
  };
}

function getModelPosition() {
  const width = window.innerWidth;

  if (width < 1000) {
    return {
     x:-0.0800000000000001,
     y:0.5,
     z:0.890000000000001
    };
  }

  return {

  x:-0.23,
  y:0.28,
  z:0.890000000000001
    
  };
}

function getBodyEnterPosition() {
  const width = window.innerWidth;

 

  if (width < 1024) {
    return {
      x: 0.08,
      y: -0.009,
      z: 0.06
    };
  }

  return {
    x:0,
    y: 0.0003,
    z: -0.0002
  };
}



function getBodyExitPosition() {
  const width = window.innerWidth;

  

  if (width < 1024) { // tablet
    return {
      x: body.position.x,
      y: body.position.y,
      z: 0
    };
  }

  // desktop
  return {
    x: 0.076,
    y: body.position.y,
    z: body.position.z
  };
}

function getValveHeadEnterPosition() {
  const width = window.innerWidth;

  // if (width < 768) {
  //   return {
  //     x: -32.6,
  //     y: 3.8,
  //     z: -0.2
  //   };
  // }

  if (width < 1024) {
    return {
      x: 0.1,
      y: 0.0006,
      z: 0.07
    };
  }

  return {
    x:0.1,
    y: 0.0006,
    z: -0.001
  };
}

function getValveHeadExitPosition() {
  const width = window.innerWidth;

  

  // if (width < 1024) { // tablet
  //   return {
  //     x: body.position.x,
  //     y: body.position.y,
  //     z: 0
  //   };
  // }

  // desktop
  return {
    x: 0.07,
    y: 0.0006,
    z: -0.001
  };
}


function getModelYPosition() {
  const width = window.innerWidth;

  if (width < 768) {
    return -1.27; // mobile position
  }

  if (width < 1024) {
    return -0.45; // tablet
  }

  return -0.33; // desktop
}

function Page1ObjectPosition() {
  const width = window.innerWidth;

  if (width < 400) {
     return {
    x: 1.25,
    y: 1.25,
    z: 1.25
  };// mobile position
  }
  
   return {
    x: 1.4,
    y: 1.4,
    z: 1.4
  };
}

function Page2ObjectPosition() {
  const width = window.innerWidth;

  if (width < 654) {
     return {
    y: 0.26,
  };// mobile position
  }
  
   return {
    y:0.38,
  };
}






// ============  fiterjs ===============


const products = [
  { id: 1,
    name: "1'' ",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch.jpg"
  },
  { id: 2,
    name: "1'' ",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-abkari.jpg"
  },
  
  { id: 3,
    name: "1'' R E",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-RE.jpg"
  },
   { id: 4,
    name: "1'' R E",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-RE-abkari.jpg"
  },
   { id: 5,
    name: "1'' F",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-f.jpg"
  },
  { id: 6,
    name: "1'' R L",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-RL.jpg"
  },
   { id: 7,
    name: "1'' R L",
    size: "1inch",
    type: "گاز",
    image: "/images/i-inch-RL-abkari.jpg"
  },
  { id: 8,
    name: "1''",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch (2).jpg"
  },
   { id: 9,
    name: "1''",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-abkari (2).jpg"
  },
   { id: 10,
    name: "1''",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch (3).jpg"
  },
  { id: 11,
    name: "1/2'' ",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1.2-inch.jpg"
  },
   { id: 12,
    name: "1/2''",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1.2-inch-abkari.jpg"
  },
   { id: 13,
    name: "1/2'' F",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1.2-inch-f.jpg"
  },
    { id: 14,
    name: "1/2'' ",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1.2-inch (2).jpg"
  },
    { id: 15,
    name: "1/2'' ",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1.2-inch-abkari (2).jpg"
  },
    { id: 16,
    name: "1/2'' ",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1.2-inch (3).jpg"
  },
  {  id: 17,
    name: "2 '' ",
    size: "2inch",
    type: "گاز",
    image: "/images/2-inch.jpg"
  }, 
  {  id: 18,
    name: "2'' ",
    size: "2inch",
    type: "گاز",
    image: "/images/2-inch-abkari.jpg"
  }, 
  { id: 19,
    name: "3/4'' F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch.jpg"
  },
   { id: 20,
    name: "3/4'' F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch-abkari.jpg"
  },
   { id: 21,
    name: "3/4'' F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch-f.jpg"
  },
   { id: 22,
    name: "3/4'' F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch (2).jpg"
  },
   { id: 23,
    name: "3/4'' F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch-abkari (2).jpg"
  },
  { id: 24,
    name: "3/4 '' F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch (3).jpg"
  },
  
  { id: 25,
    name: "3/8'' F",
    size: "3/8inch",
    type: "گاز",
    image: "/images/3.8-inch-f.jpg"
  },
   { id: 26,
    name: "3/8'' F",
    size: "3/8inch",
    type: "گاز",
    image: "/images/3.8-inch-f-abkari.jpg"
  },
    { id: 27,
    name: "3/8'' F",
    size: "3/8inch",
    type: "گاز",
    image: "/images/3.8-inch (3).jpg"
  },
   { id: 28,
    name: "3/8'' F",
    size: "3/8inch",
    type: "گاز",
    image: "/images/3.8-inch-abkari (2).jpg"
  },
  { id: 29,
    name: "3/8'' F",
    size: "3/8inch",
    type: "اب",
    image: "/images/3.8-inch (4).jpg"
  },
  { id: 30,
    name: "1 1/2'' ",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch.jpg"
  },
   { id: 31,
    name: "1 1/2'' ",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch-abkari.jpg"
  },
   { id: 32,
    name: "1 1/2 '' R L",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch-RL.jpg"
  },
   { id: 33,
    name: "1 1/2 '' R L",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inc-RL-abkari.jpg"
  },
   { id: 34,
    name: "1 1/2'' ",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch (2).jpg"
  },
   { id: 35,
    name: "1 1/2'' ",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch-abkari (2).jpg"
  },
  { id: 36,
    name: "1 1/4 ''",
    size: "1 1/4inch",
    type: "گاز",
    image: "/images/1-1.4-inch.jpg"
  },
  { id: 37,
    name: "1 1/4 '' ",
    size: "1 1/4inch",
    type: "گاز",
    image: "/images/1-1.4-inch-abkari.jpg"
  },
   { id: 38,
    name: "1 1/4'' ",
    size: "1 1/4inch",
    type: "گاز",
    image: "/images/1-1.4-inch (2).jpg"
  },
  { id: 39,
    name: "1 1/4'' ",
    size: "1 1/4inch",
    type: "گاز",
    image: "/images/1-1.4-inch-abkari (2).jpg"
  },

   { id: 40,
    name: "2 1/2'' ",
    size: "2 1/2inch",
    type: "گاز",
    image: "/images/2-1.2-inch.jpg"
  },
   { id: 41,
    name: "2 1/2'' ",
    size: "2 1/2inch",
    type: "گاز",
    image: "/images/2-1.2-inch-abkari.jpg"
  },
  { id: 42,
    name: "3 '' F",
    size: "3 inch",
    type: "گاز",
    image: "/images/3-inch.png"
  },
  { id: 43,
    name: "3 '' F",
    size: "3 inch",
    type: "گاز",
    image: "/images/3-inch-abkari.png"
  },
  { id: 44,
    name: "3/8'' F",
    size: "3/8inch",
    type: "اب",
    image: "/images/3.8-inch-w.jpg"
  },
  { id: 45,
    name: "1/2 '' FWT",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-wt.jpg"
  },
   { id: 46,
    name: "1/2 '' FWT",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-wt-abkari.jpg"
  },
  { id: 47,
    name: "1/2 '' FWT2",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-WT2.jpg"
  },
  { id: 48,
    name: "1/2 '' FWT2",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-WT2-abkari.jpg"
  },
  { id: 49,
    name: "1/2'' R",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-w (2).jpg"
  },
   { id: 50,
    name: "1/2'' FW",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-f (2).jpg"
  },
  
   { id: 51,
    name: "1/2'' FW",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-FW-abkari.jpg"
  },
  { id: 52,
    name: "1/2'' FWT2",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-fw-t2.jpg"
  },
  { id: 53,
    name: "1/2'' FWT2",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-fw-t2-abkari.jpg"
  },
   { id: 54,
    name: "1/2'' FWTL",
    size: "1/2inch",
    type: "اب",
    image: "images/1.2-fw-tl.jpg"
  },
   { id: 55,
    name: "1/2'' FWTL",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-fw-tl-abkari.jpg"
  },
    { id: 56,
    name: "1/2 '' R",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-w-abkari.jpg"
  },
  { id: 57,
    name: "1/2 ''R",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-w.jpg"
  },
   { id: 58,
    name: "3/4 '' F",
    size: "3/4inch",
    type: "اب",
    image: "/images/3.4-inch-w.jpg"
  },
   { id: 59,
    name: "3/4 '' F",
    size: "3/4inch",
    type: "اب",
    image: "/images/3.4-inch-w-abkari.jpg"
  },
   { id: 60,
    name: "3/4 '' F",
    size: "3/4inch",
    type: "اب",
    image: "/images/3.4-inch-w (2).jpg"
  },
  { id: 61,
    name: "3/4 '' F",
    size: "3/4inch",
    type: "اب",
    image: "/images/3.4-inch-w-abkari (2).jpg"
  },
  { id: 62,
    name: "3/4 '' R",
    size: "3/4inch",
    type: "اب",
    image: "/images/3.4-inch-w (3).jpg"
  },
  {
    id:63,
    name: "1 '' ",
    size: "1inch",
    type: "اب",
    image: "/images/1-inch-w (2).jpg"
  },
   {
    id:64,
    name: "1 '' RE",
    size: "1inch",
    type: "اب",
    image: "/images/1-inch-w-RE.jpg"
  },
   {
    id:65,
    name: "1 '' LE",
    size: "1inch",
    type: "اب",
    image: "/images/1-inch-w-2.jpg"
  },
 { id: 66,
    name: "1 1/4 ''",
    size: "1 1/4inch",
    type: "اب",
    image: "/images/1-1.4-inch-w-abkari.jpg"
  },
  { id: 67,
    name: "1 1/4 ''",
    size: "1 1/4inch",
    type: "اب",
    image: "/images/1-1.4-inch-w.jpg"
  },
   { id: 68,
    name: "1 1/2 ''",
    size: "1 1/2inch",
    type: "اب",
    image: "/images/1-1.2-inch-w-abkari.jpg"
  },
   { id: 69,
    name: "1 1/2 ''",
    size: "1 1/2inch",
    type: "اب",
    image: "/images/1-1.2-inch-w.jpg"
  },
  { id: 70,
    name: "2 ''",
    size: "2inch",
    type: "اب",
    image: "/images/2-inch-w.jpg"
  },

  { id: 71,
    name: "2 1/2'' ",
    size: "2 1/2inch",
    type: "اب",
    image: "/images/2-1.2-inch-w.jpg"
  },
   { id: 72,
    name: "3'' ",
    size: "3 inch",
    type: "اب",
    image: "/images/3-inch-w.png"
  },
  
];













document.querySelectorAll(".switcher").forEach(switcher => {

  const tabs = switcher.querySelector(".tabs");
  const circle = switcher.querySelector(".circle");
  const items = switcher.querySelectorAll(".item");

  const left = switcher.querySelector(".left");
  const right = switcher.querySelector(".right");


  let current = 0;




function moveCircle(item){

  circle.style.width = item.offsetWidth + "px";
  circle.style.height = item.offsetHeight + "px";


  circle.style.transform =
    `translate(${item.offsetLeft - 6}px, ${item.offsetTop - 6}px)`;

}



function activate(index){

  current = index;

  items.forEach(item =>
    item.classList.remove("active")
  );

  const activeItem = items[current];

  activeItem.classList.add("active");


  moveCircle(activeItem);




}

const itemsBox = switcher.querySelector(".items");


  items.forEach((item,index)=>{

    item.addEventListener("click",()=>{

      activate(index);

    });

  });


 left.addEventListener("click",()=>{

  current--;

  if(current < 0){
    current = items.length - 1;
  }

  items[current].click();

});


right.addEventListener("click",()=>{

  current++;

  if(current >= items.length){
    current = 0;
  }

  items[current].click();

});


  moveCircle(items[0]);

});











const productContainer = document.getElementById("productContainer");

let selectedSize = "3/8inch";
let selectedType = "گاز";


function renderProducts(){

    productContainer.innerHTML = "";


    const filteredProducts = products.filter(product => {

        return (
            product.size === selectedSize &&
            product.type === selectedType
        );

    });

    


    filteredProducts.forEach(product => {

        productContainer.innerHTML += `
 <div class="product-card " data-id="${product.id}">
        <div class="product-name-container">
          <p class="product-name"> ${product.name}</p>
           <span class="footer-arrow-conatiner product-footer-arrow-conatiner">
              <svg class="footer-svg product-footer-svg">
                <use href="#i-arrow-link">
                  <symbol id="i-arrow-link" viewBox="0 0 10 10">
                    <path
                      d="M2.57704 1.25H8.75V7.39044H7.45278V5.43327C7.45278 4.81574 7.46769 4.30777 7.49751 3.90936C7.53728 3.51096 7.55716 3.31175 7.55716 3.31175C7.55716 3.31175 7.42793 3.46614 7.16948 3.7749C6.91103 4.07371 6.56312 4.44223 6.12575 4.88048L2.24901 8.75L1.25 7.76394L5.17147 3.83466C5.60885 3.39641 5.97664 3.05279 6.27485 2.80379C6.57306 2.54482 6.72217 2.41534 6.72217 2.41534C6.72217 2.41534 6.52336 2.43028 6.12575 2.46016C5.72813 2.49004 5.22117 2.50498 4.60487 2.50498H2.57704V1.25Z">
                    </path>
                  </symbol>
                </use>
              </svg>
            </span>
        </div>
        <img class="product-thumbnail-pic" src="${product.image}" alt="${product.image}">
      </div>
       

        `;

    });



    document.querySelectorAll(".product-card")
    .forEach(card=>{

        card.addEventListener("click",()=>{

            const id = card.dataset.id;

           window.location.href = `product.html?id=${id}`;

        });

    });

}



document.querySelectorAll("[data-size]")
.forEach(button => {

    button.addEventListener("click",()=>{

        document
        .querySelectorAll("[data-size]")
        .forEach(btn=>btn.classList.remove("active"));


        button.classList.add("active");


        selectedSize = button.dataset.size;


        renderProducts();

    });

});





document.querySelectorAll("[data-type]")
.forEach(button => {

    button.addEventListener("click",()=>{


        document
        .querySelectorAll("[data-type]")
        .forEach(btn=>btn.classList.remove("active"));


        button.classList.add("active");


        selectedType = button.dataset.type;


        updateSizes();

        renderProducts();

    });

});

function updateSizes(){

    const sizeButtons =
    document.querySelectorAll(".size-item");


    sizeButtons.forEach(button=>{

        const size = button.dataset.size;


        const exists = products.some(product => {

            return (
                product.type === selectedType &&
                product.size === size
            );

        });


        if(exists){

            button.style.display = "block";

        }else{

            button.style.display = "none";

        }


    });


    // select first available size

    const firstVisible =
    [...sizeButtons]
    .find(button => button.style.display !== "none");


    if(firstVisible){

        sizeButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        // firstVisible.classList.add("active");

        // selectedSize = firstVisible.dataset.size;
        const visibleButtons = [...sizeButtons].filter(
  btn => btn.style.display !== "none"
);

const firstIndex = sizeButtons
  ? [...sizeButtons].indexOf(firstVisible)
  : 0;

// reset switcher circle
const sizeSwitcher = firstVisible.closest(".switcher");

if (sizeSwitcher && sizeSwitcher.activate) {
  sizeSwitcher.activate(firstIndex);
}

selectedSize = firstVisible.dataset.size;

    }

}


// first load
renderProducts();
updateSizes();

gsap.to(".fa-logo",{
  opacity:0,
  scrollTrigger: {
        trigger: ".company-purpose-container",
        start: "top top",
        end: "bottom center",
        scrub: 1.2,
      },

})





const hamburgerMenu = document.querySelector(".hamburger-menu");
const menuToggle = document.getElementById("menu__toggle");

function resetMenu() {
  menuToggle.checked = false;

  hamburgerMenu.style.width = "97%";
  hamburgerMenu.style.height = "7vh";
  hamburgerMenu.style.margin = "3% 0 0 1%";
}

// Handle menu toggle
menuToggle.addEventListener("change", function () {
  if (this.checked) {
    hamburgerMenu.style.width = "100%";
    hamburgerMenu.style.height = "100vh";
    hamburgerMenu.style.margin = "0";
  } else {
    resetMenu();
  }
});

// Reset menu when clicking a link
document.querySelectorAll(".menu__item").forEach(link => {
  link.addEventListener("click", () => {
    resetMenu();
  });
});
