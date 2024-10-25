// UTILS
/**
 * Rotates the given 4x4 array by 90 degrees.
 * @param {number[]} arr - The 4x4 array to rotate.
 * @returns {number[]} The rotated 4x4 array.
 */
const rotate90 = arr => {
  return [
    arr[12],
    arr[8],
    arr[4],
    arr[0],
    arr[13],
    arr[9],
    arr[5],
    arr[1],
    arr[14],
    arr[10],
    arr[6],
    arr[2],
    arr[15],
    arr[11],
    arr[7],
    arr[3]
  ];
};

/**
 * Checks if two 4x4 arrays are equal by element equality
 * @param {number[]} arr1 - The first 4x4 array.
 * @param {number[]} arr2 - The second 4x4 array.
 * @returns {boolean} Whether the two arrays are equal.
 */
const equals = (arr1, arr2) => {
  for (let i = 0; i < 16; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

// SYMMETRY CHECKS
/**
 * Checks if the given 4x4 array is horizontally symmetric.
 * @param {number[]} arr - The 4x4 array to check.
 * @returns {boolean} Whether the array is horizontally symmetric.
 */
const isHorizontallySymmetric = arr => {
  for (let i = 0; i < 4; i++) {
    if (arr[i] !== arr[12 + i] || arr[4 + i] !== arr[8 + i]) return false;
  }
  return true;
};

/**
 * Checks if the given 4x4 array is vertically symmetric.
 * @param {number[]} arr - The 4x4 array to check.
 * @returns {boolean} Whether the array is vertically symmetric.
 */
const isVerticallySymmetric = arr => {
  for (let i = 0; i < 16; i += 4) {
    if (arr[i] !== arr[i + 3] || arr[i + 1] !== arr[i + 2]) return false;
  }
  return true;
};

/**
 * Checks if the given 4x4 array is diagonally symmetric (top-left to bottom-right diagonal).
 * @param {number[]} arr - The 4x4 array to check.
 * @returns {boolean} Whether the array is diagonally symmetric.
 */
const isDiagonallySymmetric = arr => {
  return (
    arr[1] === arr[4] &&
    arr[2] === arr[8] &&
    arr[3] === arr[12] &&
    arr[6] === arr[9] &&
    arr[7] === arr[13] &&
    arr[11] === arr[14]
  );
};

/**
 * Checks if the given 4x4 array is anti-diagonally symmetric (top-right to bottom-left diagonal).
 * @param {number[]} arr - The 4x4 array to check.
 * @returns {boolean} Whether the array is anti-diagonally symmetric.
 */
const isAntiDiagonallySymmetric = arr => {
  return (
    arr[0] === arr[15] &&
    arr[1] === arr[11] &&
    arr[2] === arr[7] &&
    arr[4] === arr[14] &&
    arr[5] === arr[10] &&
    arr[8] === arr[13]
  );
};

/**
 * Checks if the given 4x4 array is rotationally symmetric.
 * @param {number[]} arr - The 4x4 array to check.
 * @returns {boolean} Whether the array is rotationally symmetric.
 */
const isRotationallySymmetric = arr => {
  let rotated = arr;
  for (let i = 0; i < 3; i++) {
    rotated = rotate90(rotated);
    if (equals(arr, rotated)) return true;
  }
  return false;
};

/**
 * Checks if the given 4x4 array is symmetric in any way.
 * @param {number[]} arrangement - The 4x4 array to check.
 * @returns {boolean} Whether the array is symmetric.
 */
const checkSymmetry = arrangement => {
  return (
    isHorizontallySymmetric(arrangement) ||
    isVerticallySymmetric(arrangement) ||
    isDiagonallySymmetric(arrangement) ||
    isAntiDiagonallySymmetric(arrangement) ||
    isRotationallySymmetric(arrangement)
  );
};

/**
 * Recursively generates the tile arrangements.
 * @returns {number[][]} The list of symmetric tile arrangements.
 */
const generate = () => {
  const results = [];

  const recurse = (current, colorsUsed) => {
    if (current.length === 16) {
      if (checkSymmetry(current)) {
        results.push([...current]);
      }
    } else {
      for (let i = 0; i < colorsUsed.length; i++) {
        if (colorsUsed[i] < 4) {
          // This way turns out to be much quicker than spread syntax
          // Create a new arrangement
          colorsUsed[i] += 1;
          current.push(i);
          // Recurse function
          recurse(current, colorsUsed);
          // Clean up for next iteration
          colorsUsed[i] -= 1;
          current.pop();
        }
      }
    }
  };

  recurse([], [0, 0, 0, 0]);
  return results;
};

const arrangements = generate();
