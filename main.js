const BASE_COLORS = ["yellow", "orange", "blue", "green"];

const colourPermutations = getPermutations(BASE_COLORS);
const arrangements = load();

let selectedIndex = Math.floor(Math.random() * arrangements.length);
draw();

function load() {
  const savedArrangements = localStorage.getItem("arrangements");
  if (savedArrangements) return JSON.parse(savedArrangements);
  const arrangements = generate();
  localStorage.setItem("arrangements", JSON.stringify(arrangements));
  return arrangements;
}

function delta(n) {
  selectedIndex = Math.min(Math.max(selectedIndex + n, 0), arrangements.length - 1);
  draw();
}

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

function draw() {
  document.getElementById("selected-index").innerText = selectedIndex + 1;

  const arrangement = arrangements[selectedIndex];
  const canvas = document.getElementById("generic-arrangement");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw generic arrangement
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < arrangement.length; i++) {
    const x = (i % 4) * 50;
    const y = Math.floor(i / 4) * 50;
    ctx.strokeRect(x, y, 50, 50);
    ctx.fillText(arrangement[i] + 1, x + 25, y + 25);
  }

  // Draw coloured arrangement
  const container = document.getElementById("colored-arrangement");
  container.innerHTML = "";
  for (let colors of colourPermutations) {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < arrangement.length; i++) {
      const x = (i % 4) * 25;
      const y = Math.floor(i / 4) * 25;
      ctx.fillStyle = colors[arrangement[i]];
      ctx.fillRect(x, y, 25, 25);
    }

    container.appendChild(canvas);
  }
}

function getNewArrangement() {
  selectedIndex = Math.floor(Math.random() * arrangements.length);
  draw();
}
