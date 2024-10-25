const BASE_COLORS = ["yellow", "orange", "blue", "green"];
const colourPermutations = getPermutations(BASE_COLORS);
let arrangement = arrangements[Math.floor(Math.random() * arrangements.length)];

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
  arrangement = arrangements[Math.floor(Math.random() * arrangements.length)];
  draw();
}

draw();
