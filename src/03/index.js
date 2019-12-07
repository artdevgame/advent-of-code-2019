async function solver(puzzle) {
  const lines = puzzle.split('\n')
    .map(line => line.split(','))

  // manhattan: 273
  // steps (best)
  const [path1, path2] = lines

  /*
  // manhattan: 6
  // 30 steps (best)
  const path1 = [
    'R8', 'U5', 'L5', 'D3'
  ]
  const path2 = [
    'U7', 'R6', 'D4', 'L4'
  ]
  */
  
  /*
  // manhattan: 159
  // 610 steps (best)
  const path1 = [
    'R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'
  ]
  const path2 = [
    'U62', 'R66', 'U55', 'R34','D71','R55','D58','R83'
  ]
  */
  
  /*
  // manhattan: 135
  // 410 step (best)
  const path1 = [
    'R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'
  ]
  const path2 = [
    'U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'
  ]
  */

  const config = {
    draw: true
  }
  
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  
  const cx = Math.floor(canvas.width / 2)
  const cy = Math.floor(canvas.height / 2)
  
  function pathToPoints (path, stopAt) {
    const grid = {}
    let totalSteps = 0
    
    let prevPoints = [0, 0]
    
    ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16)
    ctx.lineWidth = 4
    
    if (config.draw) {
      ctx.beginPath()
      
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, 6, 0, Math.PI * 2, true)
      
      ctx.moveTo(cx, cy)
    }
    
    for (const pos of path) {
      const [prevX, prevY] = prevPoints
      const dir = pos.substring(0, 1)
      const steps = Number(pos.substring(1))
      
      let x = prevX
      let y = prevY
      let i = 0
  
      if (dir === 'D') {      
        for (; y > (prevY - steps); y--, i++) {
          grid[`${prevX}:${y}`] = true

          if (stopAt && x === Number(stopAt.x) && y === Number(stopAt.y)) {
            return {grid, totalSteps: totalSteps + i}
          }
        }
      }
    
      if (dir === 'U') {      
        for (; y < (prevY + steps); y++, i++) {
          grid[`${prevX}:${y}`] = true

          if (stopAt && x === Number(stopAt.x) && y === Number(stopAt.y)) {
            return {grid, totalSteps: totalSteps + i}
          }
        }
      }
    
      if (dir === 'L') {
        for (; x > (prevX - steps); x--, i++) {
          grid[`${x}:${prevY}`] = true

          if (stopAt && x === Number(stopAt.x) && y === Number(stopAt.y)) {
            return {grid, totalSteps: totalSteps + i}
          }
        }
      }
    
      if (dir === 'R') {
        for (; x < (prevX + steps); x++, i++) {
          grid[`${x}:${prevY}`] = true

          if (stopAt && x === Number(stopAt.x) && y === Number(stopAt.y)) {
            return {grid, totalSteps: totalSteps + i}
          }
        }
      }
      
      if (config.draw) {
        const plotX = x + cx
        const plotY = (y * -1) + cy
        
        ctx.lineTo(plotX, plotY)
      }
      
      totalSteps += steps
      prevPoints = [x, y]
    }
    
    config.draw && ctx.stroke()
    
    return {grid, totalSteps}
  }
  
  const wire1 = Object.keys(pathToPoints(path1).grid)
  const wire2 = Object.keys(pathToPoints(path2).grid)
  
  const intersection = wire1.filter(el => el !== '0:0' && wire2.includes(el))
  const shortestDistance = intersection.map(el => {
    const [x, y] = el.split(':')
    
    if (config.draw) {
      const plotX = Number(x) + cx
      const plotY = (Number(y) * -1) + cy
      
      ctx.beginPath()
      ctx.fillText(`${x} x ${y}`, plotX, plotY)
    }
  
    return Math.abs(x) + Math.abs(y)
  }).sort((a, b) => a - b)

  const leastSteps = intersection.map(el => {
    const [x, y] = el.split(':')
    const distance1 = pathToPoints(path1, { x, y })
    const distance2 = pathToPoints(path2, { x, y })

    return distance1.totalSteps + distance2.totalSteps
  }).sort((a, b) => a - b)
  
  console.log({ shortestDistance: shortestDistance[0], leastSteps: leastSteps[0] })
}

window.fetch('./puzzle').then(res => res.text()).then(solver)