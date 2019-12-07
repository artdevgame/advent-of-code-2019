async function solver(puzzle) {
  console.clear()

  const aPuzzle = puzzle.split(',').map(num => Number(num))
  
  // Part 1
  const sum1 = aPuzzle.reduce((prev, current) => {
    const fuel = Math.floor(current / 3) - 2
    return prev + fuel
  }, 0)
  
  console.log({ sum1 }) // 3394689
  
  // Part 2
  const fuel = (mass) => {
    const additionalFuel = Math.floor(mass / 3) - 2
    
    if (additionalFuel < 1) {
      return mass
    }
    
    return mass + fuel(additionalFuel)
  }
  
  const sum2 = aPuzzle.reduce((prev, current) => {
    const mass = Math.floor(current / 3) - 2
    return prev + fuel(mass)
  }, 0)
  
  console.log({ sum2 }) // 5089160
}

window.fetch('./puzzle').then(res => res.text()).then(solver)