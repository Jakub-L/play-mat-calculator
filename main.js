// GLOBALS
const MONTSERRAT_URL = "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2";

// DATA
/**
 * Gets the permutations of a given array.
 * @template T
 * @param {T[]} arr - The array to get permutations of.
 * @returns {T[][]} - The permutations of the array.
 */
function getPermutations(arr) {
  const results = [];
  function permute(arr, memo = []) {
    let cur;
    for (let i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) results.push(memo.concat(cur));
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
    return results;
  }
  return permute(arr);
}

// BUTTON ACTIONS
/**
 * Shifts current arrangement by a given delta, clamping it to the bounds.
 * @param {number} n - The delta to shift by.
 */
function delta(n) {
  selectedIndex = Math.min(Math.max(selectedIndex + n, 0), arrangements.length - 1);
  update();
}

/** Selects a random arrangement */
function getRandom() {
  selectedIndex = Math.floor(Math.random() * arrangements.length);
  update();
}

// DRAWING
async function drawGeneric() {
  const canvas = document.getElementById("generic-arrangement");
  const ctx = canvas.getContext("2d");

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Load font
  const font = new FontFace("Montserrat", `url(${MONTSERRAT_URL})`);
  await font.load();

  // Set up properties
  ctx.font = "20px Montserrat";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#09090b";
  ctx.strokeStyle = "#09090b";
  ctx.lineWidth = 2;

  // Draw arrangement squares
  for (let i = 0; i < arrangement.length; i++) {
    const x = (i % 4) * 50;
    const y = Math.floor(i / 4) * 50;
    ctx.strokeRect(x, y, 50, 50);
    ctx.fillText(arrangement[i] + 1, x + 25, y + 25);
  }

  // Draw outline
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 200, 200);
}

function drawColoured() {
  const container = document.getElementById("colored-arrangements");

  // Clear container
  container.innerHTML = "";

  for (const colors of colorPermutations) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 100;
    canvas.height = 100;

    for (let i = 0; i < arrangement.length; i++) {
      const x = (i % 4) * 25;
      const y = Math.floor(i / 4) * 25;
      ctx.fillStyle = colors[arrangement[i]];
      ctx.fillRect(x, y, 25, 25);
    }

    container.appendChild(canvas);
  }
}

// UPDATES
function updateArrangement() {
  arrangement = arrangements[selectedIndex];
  document.getElementById("selected-index").innerText = `${selectedIndex + 1} / ${arrangements.length}`;
}

function update() {
  updateArrangement();
  drawGeneric();
  drawColoured();
}

// MAIN
const colorPermutations = getPermutations(["#fbbf24", "#ea580c", "#0369a1", "#65a30d"]);
let selectedIndex = 0;
let arrangement = arrangements[0];
update();
