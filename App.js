document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino')
  const grid = document.querySelector('.grid')
  const alert = document.getElementById('alert')
  const desert = document.getElementById('desert')
  let randomly = Math.random() * 4000
  let gravity = 0.9
  let isJumping = false
  let isGameOver = false

  const control = (event) => {
    if (event.key === ' ') {
      if (!isJumping) {
        jump()
      }
    }
  }
  document.addEventListener('keydown', control)

  let position = 0
  const jump = () => {
    isJumping = true
    let count = 0
    let timerId = setInterval(() => {
      // move down
      if (count === 12) {
        clearInterval(timerId)
        let downTimerId = setInterval(() => {
          if (count === 0) {
            clearInterval(downTimerId)
            isJumping = false
          }
          position -= 5
          count--
          position = position * gravity
          dino.style.bottom = position + 'px'
        }, 20)
      }
      // move up
      position += 20
      count++
      console.log(count)
      position = position * gravity
      dino.style.bottom = position + 'px'
    }, 20)
  }

  //generating obstacles
  const generateObstacle = () => {
    if (!isGameOver) {
      let obstaclePosition = 1000
      const obstacle = document.createElement('div')
      obstacle.classList.add('obstacle')
      grid.appendChild(obstacle)
      obstacle.style.left = obstaclePosition + 'px'

      let timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId)
          alert.innerHTML = 'Game Over'
          isGameOver = true
          desert.style.animationPlayState = 'paused'
          // remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild)
          }
        }
        obstaclePosition -= 10
        obstacle.style.left = obstaclePosition + 'px'
      }, 20)
      setTimeout(generateObstacle, randomly)
    }
  }
  generateObstacle()
})
