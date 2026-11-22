gsap.registerPlugin(ScrollTrigger);
// ------------ baner -------------

    const items = document.querySelectorAll('.stat-item');
    const separators = document.querySelectorAll('.separator');

    gsap.set(items, { opacity: 0, y: 30 });
    gsap.set(separators, { opacity: 0, scaleY: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.banner',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    const animOrder = [6, 5, 4, 3, 2, 1, 0];

    animOrder.forEach((index, i) => {
        const el = document.querySelector(`[data-index="${index}"]`);
        if (el.classList.contains('stat-item')) {
            tl.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            }, i * 0.15);
        } else if (el.classList.contains('separator')) {
            tl.to(el, {
                opacity: 1,
                scaleY: 1,
                duration: 0.5,
                ease: 'power2.out',
                transformOrigin: 'top center'
            }, i * 0.15 - 0.05);
        }
    });

    gsap.to('.separator-glow', {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
    });












// ------ company purpose -------


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
//   div1.style.transform = 'translateY(0)';
//   div2.style.transform = 'translateY(0)';
//   div3.style.transform = 'translateY(0)';

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
    // div1.style.transform = `translateY(${translateYPic}vh)`;
    // div2.style.transform = `translateY(${translateYPic}vh)`;

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

gsap.fromTo(
  ".div-1-inner",
  {
    clipPath: "inset(100% 0% 0%)"
  },
  {
    clipPath: "inset(0% 0% 0%)",
    ease: "none",
    scrollTrigger: {
      trigger: ".company-purpose-container",
      start: "top top",
      end: "top -220%",
      scrub: 1,
    }
  }
);