async function solver(puzzle) {
  console.clear()

  const MODE_POSITION = 0
  const MODE_IMMEDIATE = 1

  const aPuzzle = puzzle.split(',').map(n => Number(n))

  function getValue (value, mode, memory) {
    if (mode === MODE_IMMEDIATE) {
      return value
    }

    // MODE_POSITION
    return memory[value]
  }

  function runInstruction (memory, pointer, inputs) {
    try {
      if (!memory[pointer]) {
        console.info('Program finished')
        return
      }

      const param0 = memory[pointer].toString().padStart(5, 0).split('')
      const param1 = memory[pointer + 1]
      const param2 = memory[pointer + 2]
      const param3 = memory[pointer + 3]

      const input3Mode = Number(param0[0])
      const input2Mode = Number(param0[1])
      const input1Mode = Number(param0[2])
      const opcode = Number(param0.slice(3).join(''))

      console.log({
        opcode,
        input1Mode,
        input2Mode,
        input3Mode
      })

      if (![1, 2, 3, 4, 5, 6, 7, 8, 99].includes(opcode)) {
        throw new Error(`Unknown opcode: ${opcode}`, pointer)
      }

      if (opcode === 99) {
        console.warn('Program halted')
        return memory[0]
      }

      const i1 = getValue(param1, input1Mode, memory)
      const i2 = getValue(param2, input2Mode, memory)

      if (opcode === 1) {
        console.info('[ADD]', { pointer: param3, value: i1 + i2, inputs: { i1, i2 } })
        memory[param3] = i1 + i2
        pointer += 4 // param0, 2 input, 1 output
      }

      if (opcode === 2) {
        console.info('[MULTIPLY]', { pointer: param3, value: i1 * i2, inputs: { i1, i2 } })
        memory[param3] = i1 * i2
        pointer += 4 // param0, 2 input, 1 output
      }

      if (opcode === 3) {
        console.info('[SET]', { pointer: param1, value: i1, inputs: { i1 } })
        memory[param1] = inputs.systemId
        pointer += 2 // param0, 1 input
      }

      if (opcode === 4) {
        console.info('[Diagnostic Code]', i1) // not sure
        pointer += 2 // param0, 1 input
      }

      if (opcode === 5) {
        console.info('[JUMP-IF-TRUE]', { i1, i2 })
        if (i1 > 0) {
          pointer = i2
        } else {
          pointer += 3
        }
      }

      if (opcode === 6) {
        console.info('[JUMP-IF-FALSE]', { i1, i2 })
        if (i1 === 0) {
          pointer = i2
        } else {
          pointer += 3
        }
      }

      if (opcode === 7) {
        console.info('[LESS THAN]', { pointer: param3, i1, i2 })
        memory[param3] = i1 < i2 ? 1 : 0
        pointer += 4
      }

      if (opcode === 8) {
        console.info('[EQUALS]', { pointer: param3, i1, i2 })
        memory[param3] = i1 === i2 ? 1 : 0
        pointer += 4
      }

      runInstruction(memory, pointer, inputs)
    } catch (err) {
      console.error(err.message, '[Final memory state]', memory)
    }
  }

  const memory = [...aPuzzle]

  const systems = {
    1: 'Air Conditioner Unit',
    5: 'Thermal Radiator Controller'
  }


  // part 1: 11933517
  // const systemId = 1

  // part 2: 10428568
  const systemId = 5

  const inputs = {
    systemId
  }

  runInstruction(memory, 0, inputs)
}

window.fetch('./puzzle').then(res => res.text()).then(solver)