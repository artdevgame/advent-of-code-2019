async function solver(puzzle) {
  const range = puzzle.split('-')
  const lower = Number(range[0])
  const upper = Number(range[1])

  // const lower = 111121
  // const upper = 111129

  const matches = []

  console.log({ lower, upper })

  // the value is within the range given
  for (let current = lower; current < upper; current++) {
    const sCurrent = current.toString()
    const aCurrent = sCurrent.split('')

    // 6-digit num
    if (sCurrent.length !== 6) continue

    // digits never decrease
    const isSequential = aCurrent.filter((num, i, all) => {
      if (!i) return num
      return num >= all[i - 1]
    }).join('') === sCurrent

    if (!isSequential) continue

    // has 2 adjacent numbers
   const hasAdjacentNumbers = Boolean(sCurrent
    .match(/([0-9])\1*/g)
    .filter(num => num.length === 2)
    .length)

    if (!hasAdjacentNumbers) continue

    // part 1: 1873
    // part 2: 1264
    matches.push(current)
  }

  console.log({ matches })
}

window.fetch('./puzzle').then(res => res.text()).then(solver)