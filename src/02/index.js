async function solver(puzzle) {
  console.clear()

  const aPuzzle = puzzle.split(',').map(n => Number(n))

  const chunk = (arr, len) => {
    const chunks = []
    
    for (let i = 0; i < arr.length; i += len) {
      chunks.push(arr.slice(i, len + i))
    }
    
    return chunks
  }

  const bufferCount = 4

  function runIntcode (i, bits) {
    const program = chunk(bits, bufferCount)
    const buffer = program[i]
    const opcode = buffer[0]
    
    if (![1, 2, 99].includes(opcode)) {
      throw new Error(`Unknown opcode: ${opcode}`, i)
    }
    
    if (opcode === 99) {
      return bits[0]
    }
    
    const i1 = bits[buffer[1]]
    const i2 = bits[buffer[2]]
    const o1 = buffer[3]
    
    if (opcode === 1) {
      bits[o1] = i1 + i2
    }
    
    if (opcode === 2) {
      bits[o1] = i1 * i2
    }

    return runIntcode(i + 1, bits)
  }

  // Part 1
  /*
  const memory = [...aPuzzle]
  memory[1] = 12
  memory[2] = 2

  const address0 = runIntcode(0, memory)
  console.log({ address0 }) // 3516593
  */

  // Part 2
  program:
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const memory = [...aPuzzle]
      memory[1] = noun
      memory[2] = verb

      const address0 = runIntcode(0, memory)
      
      if (address0 === 19690720) {
        console.log({ verb, noun, address0, memory })
        console.log({ answer: (100 * noun + verb) })
        break program
      }
    }
  }
}

window.fetch('./puzzle').then(res => res.text()).then(solver)