const products = [
  { id: 1,
    name: "1 INCH ",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch.png"
  },
  { id: 2,
    name: "1 INCH F",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-f.png"
  },
  { id: 3,
    name: "1 INCH E",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-E.png"
  },
  { id: 4,
    name: "1 INCH L",
    size: "1inch",
    type: "گاز",
    image: "/images/1-inch-L2.png"
  },
  { id: 5,
    name: "1/2 INCH L",
    size: "1/2inch",
    type: "گاز",
    image: "/images/1-inch-L.png"
  },
  {  id: 6,
    name: "2 INCH ",
    size: "2inch",
    type: "گاز",
    image: "/images/2-inch.png"
  }, 
  { id: 7,
    name: "3/4 INCH ",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch.png"
  },
   { id: 8,
    name: "3/4 INCH F",
    size: "3/4inch",
    type: "گاز",
    image: "/images/3.4-inch-F.png"
  },
  { id: 9,
    name: "3/8 INCH HN",
    size: "3/8inch",
    type: "گاز",
    image: "/images/3.8-inch.png"
  },
  { id: 10,
    name: "1 1/2 INCH",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch.png"
  },
   { id: 11,
    name: "1 1/2 INCH L",
    size: "1 1/2inch",
    type: "گاز",
    image: "/images/1-1.2-inch-L.png"
  },
  { id: 12,
    name: "1 1/4 INCH",
    size: "1 1/4inch",
    type: "گاز",
    image: "/images/1-1.4-inch.png"
  },
  { id: 13,
    name: "1/2 WT",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-wt.png"
  },
  { id: 14,
    name: "1/2 WT2",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-wt2.png"
  },
  { id: 15,
    name: "1/2 WTR",
    size: "1/2inch",
    type: "اب",
    image: "/images/1.2-inch-wtr.png"
  },
  
];











// document.querySelectorAll(".switcher").forEach(switcher => {

//   const circle = switcher.querySelector(".circle");
//   const buttons = switcher.querySelectorAll(".item");


//   function moveCircle(button) {

//     circle.style.width = button.offsetWidth + "px";

//     circle.style.transform =
//       `translateX(${button.offsetLeft - 6}px)`;

//   }


//   buttons.forEach(button => {

//     button.addEventListener("click", () => {

//       buttons.forEach(btn =>
//         btn.classList.remove("active")
//       );

//       button.classList.add("active");

//       moveCircle(button);

//     });

//   });


//   // initial position for each container

//   moveCircle(
//     switcher.querySelector(".active")
//   );

// });

document.querySelectorAll(".switcher").forEach(switcher => {

  const tabs = switcher.querySelector(".tabs");
  const circle = switcher.querySelector(".circle");
  const items = switcher.querySelectorAll(".item");

  const left = switcher.querySelector(".left");
  const right = switcher.querySelector(".right");


  let current = 0;


//   function moveCircle(item){

//     circle.style.width =
//       item.offsetWidth + "px";

//     circle.style.transform =
//       `translateX(${item.offsetLeft - 6}px)`;

//   }

function moveCircle(item){

  circle.style.width = item.offsetWidth + "px";
  circle.style.height = item.offsetHeight + "px";


  circle.style.transform =
    `translate(${item.offsetLeft - 6}px, ${item.offsetTop - 6}px)`;

}


//   function activate(index){

//     current = index;

//     items.forEach(item =>
//       item.classList.remove("active")
//     );

//     items[current].classList.add("active");

//     moveCircle(items[current]);
    

//   }

function activate(index){

  current = index;

  items.forEach(item =>
    item.classList.remove("active")
  );

  const activeItem = items[current];

  activeItem.classList.add("active");


  moveCircle(activeItem);


  // center selected item
//   activeItem.scrollIntoView({
//     behavior: "smooth",
//     block: "nearest",
//     inline: "center"
//   });

}

const itemsBox = switcher.querySelector(".items");
// function activate(index){

//   current = index;

//   items.forEach(item =>
//     item.classList.remove("active")
//   );


//   const activeItem = items[current];

//   activeItem.classList.add("active");


//   moveCircle(activeItem);


//   // center only inside the tabs container
//   const containerCenter = itemsBox.offsetWidth / 2;

//   const itemCenter =
//     activeItem.offsetLeft + activeItem.offsetWidth / 2;


//   itemsBox.scrollTo({

//     left: itemCenter - containerCenter,

//     behavior:"smooth"

//   });

// }
// function activate(index){

//   current = index;

//   items.forEach(item =>
//     item.classList.remove("active")
//   );


//   const activeItem = items[current];

//   activeItem.classList.add("active");


//   moveCircle(activeItem);


//   const container = activeItem.parentElement;


//   const scrollPosition =
//     activeItem.offsetLeft -
//     (container.clientWidth / 2) +
//     (activeItem.offsetWidth / 2);


//   container.scrollTo({
//     left: scrollPosition,
//     behavior: "smooth"
//   });

// }

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

// const arrows = document.querySelectorAll(".arrow");


// arrows.forEach(arrow => {

//   arrow.addEventListener("click",()=>{

//     const tabs =
//     arrow.parentElement.querySelector(".tabs");


//     if(arrow.classList.contains("right")){

//       tabs.scrollBy({
//         left:120,
//         behavior:"smooth"
//       });

//     } else {

//       tabs.scrollBy({
//         left:-120,
//         behavior:"smooth"
//       });

//     }

//   });

// });









const productContainer = document.getElementById("productContainer");

let selectedSize = "3.8inch";
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

     // add click to cards
//     document.querySelectorAll(".product-card")
//     .forEach(card=>{

//         card.addEventListener("click",()=>{

//             const id = card.dataset.id;

//             window.location.href = `/product?id=${id}`;

//         });

//     });

// }

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



// document.querySelectorAll("[data-type]")
// .forEach(button => {

//     button.addEventListener("click",()=>{

//         document
//         .querySelectorAll("[data-type]")
//         .forEach(btn=>btn.classList.remove("active"));


//         button.classList.add("active");


//         selectedType = button.dataset.type;


//         renderProducts();

//     });

// });

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
