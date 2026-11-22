


gsap.registerPlugin(Draggable);

const menuDropZone = document.querySelector(".menu-drop-zone");
const menuDrawer = document.querySelector(".menu-drawer");
const menuLogo = document.querySelector(".menu-logo");
const menuItems = document.querySelector(".menu-items");
const menuItemElements = document.querySelectorAll(".menu-item");
const menuToggler = document.querySelector(".menu-toggler");

let isMenuOpen = false;

gsap.set(menuItems,{width:"auto"});
gsap.set(menuItemElements,{opacity:1});

const menuItemFullWidth = menuItems.offsetWidth;
const drawerGap = 0.35 *16;
const drawerPadding = 0.35 *16;
const logoWidth = menuLogo.offsetWidth;
const togglerWidth = menuToggler.offsetWidth;

const closeMenuWidth =
drawerPadding + logoWidth + drawerGap + togglerWidth + drawerPadding;

const openMenuWidth =
drawerPadding + logoWidth + drawerGap + menuItemFullWidth + drawerGap + togglerWidth + drawerPadding;

gsap.set(menuItems,{width:0,marginRight:0});
gsap.set(menuItemElements,{opacity:0,scale:0.85});
gsap.set(menuDropZone,{width: closeMenuWidth });


function toggleMenu() {
    if(isMenuOpen) {
        closeMenu()
    }else {
        openMenu()
    }

    isMenuOpen = !isMenuOpen
}

menuToggler.addEventListener('click',toggleMenu);

function openMenu() {
    menuToggler.classList.add("close");
    gsap.to(menuItems,{
        width:menuItemFullWidth,
        marginRight:drawerGap,
        duration:0.5,
        ease:'power3.inOut',
        onStart:() => {
         gsap.to(menuItemElements,{
            opacity:1,
            scale:1,
            duration:0.3,
            stagger:0.05,
            delay:0.2,
            ease:"power3.out"
         });

        },
    });
}

function closeMenu() {
    menuToggler.classList.remove("close");
    gsap.to(menuItems,{
        width:0,
        marginRight:0,
        duration:0.5,
        ease:'power3.inOut',
        onStart:() => {
         gsap.to(menuItemElements,{
            opacity:0,
            scale:0.85,
            duration:0.3,
            ease:"power3.out",
            stagger:{
                each:0.05,
                from:"end"
            }
            
         });
         
        },
    });
}

const snapThreshold = 200;

Draggable.create(menuDrawer,{
    type:"x,y",
    bounds:document.documentElement,
    dragClickables: true,
    cursor:"grab",
    activeCursor:'grabbing',
    onDragStart:function() {
        const activeMenuWidth = isMenuOpen ? openMenuWidth : closeMenuWidth;
        gsap.set(menuDropZone,{width:activeMenuWidth})
    },

    onDrag:function() {
        const isMenuWithinSnapZone =
        Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;
        if(isMenuWithinSnapZone) {
            gsap.to(menuDropZone,{opacity:1,duration:0.1});
        } else {
            gsap.to(menuDropZone,{opacity:0,duration:0.1});
        }
    },

    onDragEnd: function() {
        gsap.to(menuDropZone,{opacity:0,duration:0.1});
        const isMenuWithinSnapZone =
        Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;
         if(isMenuWithinSnapZone) {
            gsap.to(menuDrawer,{
                x:0,
                y:0,
                duration:0.3,
                ease:"power2.out"
            });
        } 

    }
});







const menu = document.querySelector(".nav-menu");

if (menu) {
  const layer = menu.querySelector(".layer");
  const links = menu.querySelectorAll("li a");
  const storageKey = "aminshir-active-menu";

  function moveLayer(link, animate = true) {
    if (!link || !layer) return;

    const item = link.closest("li");

    layer.style.transition = animate
      ? "top 0.35s ease, height 0.35s ease"
      : "none";

    layer.style.top = `${item.offsetTop}px`;
    layer.style.height = `${item.offsetHeight}px`;

    links.forEach(a => a.classList.remove("active"));
    link.classList.add("active");
  }

  // Restore the saved menu item after refresh
  const savedHref = localStorage.getItem(storageKey);

  const savedLink = savedHref
    ? [...links].find(link => link.getAttribute("href") === savedHref)
    : null;

  const initialLink =
    savedLink ||
    menu.querySelector("a.active") ||
    links[0];

  moveLayer(initialLink, false);

  // Save the selected menu item
  links.forEach(link => {
    link.addEventListener("click", () => {
      localStorage.setItem(
        storageKey,
        link.getAttribute("href")
      );

      moveLayer(link);
    });
  });

  // Reposition the layer when the window resizes
  window.addEventListener("resize", () => {
    const activeLink = menu.querySelector("a.active");
    if (activeLink) moveLayer(activeLink, false);
  });
}