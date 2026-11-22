// import {gsap} from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { CustomEase } from "gsap/all";



// gsap.registerPlugin(CustomEase,SplitText);
// CustomEase.create('hop', "0.8, 0, 0.2, 1");
// CustomEase.create('hop2', "0.9, 0, 0.1, 1");

// const splitText = (selector,type,className,mask=true) => {
//     return SplitText.create(selector,{
//         type:type,
//         [`${type}Class`]:className,
//         ...(mask && {mask: type}),
//     });
// };

// const PreloaderHeaderSplit = splitText(".preloader-header h1",'chars','char');

// const tl= gsap.timeline({ delay: 0.5});

// tl.to (
//     ".preloader-header h1 .char",
//     {
//         y:"0%",
//         duration:1,
//         ease:"hop2",
//         stagger:{each:0.125,from:"random"}
//     },
//     "0.35"
// );

// tl.to (
//     ".preloader-counter p",
//     {
//         y:"0%",
//         duration:1,
//         ease:"hop2",
//         onStart:()=>{
//             const counterE1 = document.querySelector(".preloader-counter p");
//             const counter = {value :0};
//             gsap.to(counter,{
//                 value: 100,
//                 duration:2,
//                 delay:0.5,
//                 ease:"power2.inOut",
//                 onUpdate:()=>{
//                     counterE1.textContent = String(Math.round(counter.value)).padStart(3,"0");
//                 }
//             })
//         }
//     },
//     "<",
// );

// tl.to (
//     ".preloader-counter p",
//     {
//         y:"-100%",
//         duration:0.75,
//         ease:"hop2",
//     },
//     "3.25"
// );

// tl.to (
//     ".preloader-header h1 .char",
//     {
//         y:"-100%",
//         duration:0.75,
//         ease:"hop2",
//         stagger:{each:0.125,from:"random"}
//     },
//     "3.25"
// );


// tl.to (
//     ".preloader",
//     {
//         clipPath:"polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
//         duration:1,
//         ease:"hop2",
//     },
//     "3.5"
// );


















import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create('hop', "0.8, 0, 0.2, 1");
CustomEase.create('hop2', "0.9, 0, 0.1, 1");

const splitText = (selector, type, className, mask = true) => {
  return SplitText.create(selector, {
    type: type,
    [`${type}Class`]: className,
    ...(mask && { mask: type }),
  });
};

const PreloaderHeaderSplit = splitText(".preloader-header h1", 'chars', 'char');

// ========== CONTROLLABLE TIMELINE ==========
let preloaderTL = gsap.timeline({ paused: true });
let modelLoaded = false;

export function initPreloader() {
  return new Promise((resolve) => {
    preloaderTL
      // Intro: show chars + counter
      .to(".preloader-header h1 .char", {
        y: "0%",
        duration: 1,
        ease: "hop2",
        stagger: { each: 0.125, from: "random" }
      }, 0)
      .to(".preloader-counter p", {
        y: "0%",
        duration: 1,
        ease: "hop2",
        onStart: () => {
          const counterEl = document.querySelector(".preloader-counter p");
          const counter = { value: 0 };
          gsap.to(counter, {
            value: 100,
            duration: 2,
            delay: 0.5,
            ease: "power2.inOut",
            onUpdate: () => {
              counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
            }
          });
        }
      }, "<")
      .addLabel("introDone")
      // Pause here until model is loaded
      .call(() => {
        if (!modelLoaded) {
          preloaderTL.pause();
        }
      })
      // Exit animation (will play after resume)
      .to(".preloader-counter p", {
        y: "-100%",
        duration: 0.75,
        ease: "hop2"
      })
      .to(".preloader-header h1 .char", {
        y: "-100%",
        duration: 0.75,
        ease: "hop2",
        stagger: { each: 0.125, from: "random" }
      }, "-=0.75")
      .to(".preloader", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop2"
      }, "-=0.25")
      .call(() => resolve()); // Preloader fully hidden

    preloaderTL.play();
  });
}

export function onModelLoaded() {
  modelLoaded = true;
  if (preloaderTL.paused()) {
    preloaderTL.resume();
  }
}

