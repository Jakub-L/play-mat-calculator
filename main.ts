const colors: string[] = ["O", "Y", "B", "G"]
const results: Set<string> = new Set()
let count = 0


const generate = (current: number[], colorsUsed: number[]) => {
  if (current.length === 16) {
    count += 1
  }
  else {
    for (let i = 0; i < colorsUsed.length; i++) {
      if (colorsUsed[i] < 4) {
        // Create a new arrangement
        colorsUsed[i] += 1
        current.push(i)
        // Recurse function
        generate(current, colorsUsed)
        // Clean up for next iteration
        colorsUsed[i] -= 1
        current.pop()
      }
    }
  }
}
console.time()
generate([], [0, 0, 0, 0])
console.timeEnd()
console.log(count)