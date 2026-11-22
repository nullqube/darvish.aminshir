import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';

const ROWS = 6;
const COLS = 6;
const COOLDOWN = 1000;
let isFlipped = false;

const frontTemplate = document.getElementById("front-template");
const backTemplate = document.getElementById("back-template");

function createTile(row, col) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const front = document.createElement("div");
    front.className = "tile-face tile-front";
    front.appendChild(frontTemplate.content.cloneNode(true));

    const back = document.createElement("div");
    back.className = "tile-face tile-back";
    back.appendChild(backTemplate.content.cloneNode(true));

    tile.appendChild(front);
    tile.appendChild(back);
    tile.dataset.row = row;
    tile.dataset.col = col;

    return tile;
}

function createBoard() {
    const board = document.querySelector(".board");
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < COLS; j++) {
            row.appendChild(createTile(i, j));
        }
        board.appendChild(row);
    }
}

// Measures real pixel positions and shifts each tile's content clone
// so the slices line up into one seamless card — works regardless
// of gap size, padding, or viewport dimensions.
function positionSlices() {
    const board = document.querySelector(".board");
    const boardRect = board.getBoundingClientRect();

    document.querySelectorAll(".tile").forEach((tile) => {
        const tileRect = tile.getBoundingClientRect();
        const offsetX = tileRect.left - boardRect.left;
        const offsetY = tileRect.top - boardRect.top;

        const front = tile.querySelector(".tile-front > .mega");
        const back = tile.querySelector(".tile-back > .mega");

        [front, back].forEach((mega) => {
            if (!mega) return;
            mega.style.width = `${boardRect.width}px`;
            mega.style.height = `${boardRect.height}px`;
            mega.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
        });
    });
}

function initializeTileAnimation() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
        let lastEnterTime = 0;

        tile.addEventListener("mouseenter", () => {
            const currentTime = Date.now();
            if (currentTime - lastEnterTime > COOLDOWN) {
                lastEnterTime = currentTime;

                let tiltY;
                if (index % 6 === 0) tiltY = -40;
                else if (index % 6 === 5) tiltY = 40;
                else if (index % 6 === 1) tiltY = -20;
                else if (index % 6 === 4) tiltY = 20;
                else if (index % 6 === 2) tiltY = -10;
                else tiltY = 10;

                animateTile(tile, tiltY);
            }
        });
    });

    const flipButton = document.getElementById("flipButton");
    flipButton.addEventListener("click", () => flipAllTiles(tiles));
}

function animateTile(tile, tiltY) {
    gsap
        .timeline()
        .set(tile, { rotateX: isFlipped ? 180 : 0, rotateY: 0 })
        .to(tile, {
            rotateX: isFlipped ? 450 : 270,
            rotateY: tiltY,
            duration: 0.5,
            ease: "power2.out",
        })
        .to(tile, {
            rotateX: isFlipped ? 540 : 360,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
        }, "-=0.25");
}

function flipAllTiles(tiles) {
    isFlipped = !isFlipped;
    gsap.to(tiles, {
        rotateX: isFlipped ? 180 : 0,
        duration: 1,
        stagger: { amount: 0.5, from: "random" },
        ease: "power2.inOut",
    });
}

function init() {
    createBoard();
    requestAnimationFrame(positionSlices); // wait for real layout dimensions
    initializeTileAnimation();
    window.addEventListener("resize", () => requestAnimationFrame(positionSlices));
}

document.addEventListener("DOMContentLoaded", init);