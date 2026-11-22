// import { vertexShader, fragmentShader } from "./contactusshader";

// import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
// import { ScrollTrigger } from 'https://esm.sh/gsap@3/ScrollTrigger';

// import Lenis from 'https://esm.sh/lenis@1';


// gsap.registerPlugin(ScrollTrigger);

// const lenis = new Lenis()

// function raf(time) {
//   lenis.raf(time);
//   ScrollTrigger.update();
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);
// lenis.on("scroll",  ScrollTrigger.update );


// const CONFIG = {
//     // color: "#ebf5df",
//    color: "#ff7733",
//     spread: .8,
//     speed: 2,
// };

// const canvas = document.querySelector(".hero-canvas");
// const hero = document.querySelector(".hero");

// const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
// const renderer = new THREE.WebGLRenderer({ canvas,antialias: false, alpha: true });

// function hexToRgb(hex) {
//     const result =
//         /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

//     return result
//         ? {
//               r: parseInt(result[1], 16) / 255,
//               g: parseInt(result[2], 16) / 255,
//               b: parseInt(result[3], 16) / 255,
//           }
//         : {
//               r: 0.89,
//               g: 0.89,
//               b: 0.89,
//           };
// }

// function resize() {
//     const width = hero.offsetWidth;
//     const height = hero.offsetHeight;

//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// }

// resize();
// window.addEventListener("resize", resize);

// const rgb = hexToRgb(CONFIG.color);

// const geometry = new THREE.PlaneGeometry(2, 2);

// const material = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//         uProgress: {
//             value: 0,
//         },
//         uResolution: {
//             value: new THREE.Vector2(
//                 hero.offsetWidth,
//                 hero.offsetHeight
//             ),
//         },
//         uColor: {
//             value: new THREE.Vector3(
//                 rgb.r,
//                 rgb.g,
//                 rgb.b
//             ),
//         },
//         uSpread: {
//             value: CONFIG.spread,
//         },
//     },
//     transparent: true,
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// let scrollProgress = 0;

// function animate() {
//     material.uniforms.uProgress.value = scrollProgress;

//     renderer.render(scene, camera);

//     requestAnimationFrame(animate);
// }

// animate();

// lenis.on("scroll",({scroll}) => {
//     const heroHeight = hero.offsetHeight;
//     const windowHeight = window.innerHeight;
//     const maxScroll = heroHeight - windowHeight;
//     scrollProgress = Math.min((scroll / maxScroll) * CONFIG.speed, 1,1);
// })
 
// if ("scrollRestoration" in history) {
//   history.scrollRestoration = "manual";
// }

// document.addEventListener("click", function (e) {

//   const link = e.target.closest("[data-home-link]");

//   if (!link) return;

//   sessionStorage.setItem("comingToHome", "true");

// });

import { vertexShader, fragmentShader } from "./contactusshader";

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { ScrollTrigger } from "https://esm.sh/gsap@3/ScrollTrigger";
import Lenis from "https://esm.sh/lenis@1";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    smoothWheel: true,
    syncTouch: true,
    touchMultiplier: 1,
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

const CONFIG = {
    color: "#ff7733",
    spread: 0.8,
    speed: 2,
};

const canvas = document.querySelector(".hero-canvas");
const hero = document.querySelector(".hero");

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    0,
    1
);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
});

function hexToRgb(hex) {
    const result =
        /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? {
              r: parseInt(result[1], 16) / 255,
              g: parseInt(result[2], 16) / 255,
              b: parseInt(result[3], 16) / 255,
          }
        : {
              r: 0.89,
              g: 0.89,
              b: 0.89,
          };
}

function resize() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    material.uniforms.uResolution.value.set(width, height);
}

const rgb = hexToRgb(CONFIG.color);

const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,

    uniforms: {
        uProgress: {
            value: 0,
        },

        uResolution: {
            value: new THREE.Vector2(
                hero.clientWidth,
                hero.clientHeight
            ),
        },

        uColor: {
            value: new THREE.Vector3(
                rgb.r,
                rgb.g,
                rgb.b
            ),
        },

        uSpread: {
            value: CONFIG.spread,
        },
    },

    transparent: true,
});

const mesh = new THREE.Mesh(
    geometry,
    material
);

scene.add(mesh);

let scrollProgress = 0;

lenis.on("scroll", ({ scroll }) => {
    const maxScroll =
        hero.offsetHeight - window.innerHeight;

    if (maxScroll <= 0) {
        scrollProgress = 0;
        return;
    }

    scrollProgress = Math.min(
        Math.max(scroll / maxScroll, 0) *
            CONFIG.speed,
        1
    );
});

function animate() {
    material.uniforms.uProgress.value = scrollProgress;

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

resize();
window.addEventListener("resize", resize);

animate();