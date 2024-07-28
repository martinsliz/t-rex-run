document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino')
  const grid = document.querySelector('.grid')
  let gravity = 0.9
  isJumping = false

  const control = (event) => {
    if (event.key === ' ') {
      if (!isJumping) {
        jump()
      }
    }
  }

  let position = 0
  const jump = () => {
    let timerId = setInterval(function () {
      position += 20
      position = position * gravity
      dino.style.bottom = position + 'px'
    }, 20)
  }

  document.addEventListener('keydown', control)
})
