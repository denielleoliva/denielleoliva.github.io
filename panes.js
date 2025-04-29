const panes = document.querySelectorAll('.pane')

let z = 1

panes.forEach((pane) => {
  const title = pane.querySelector('.title')
  const corner = pane.querySelector('.corner')

  pane.addEventListener('mousedown', () => {
    z = z + 1
    pane.style.zIndex = z
  })

  title.addEventListener('mousedown', (event) => {
    pane.classList.add('is-dragging')

    let l = pane.offsetLeft
    let t = pane.offsetTop

    let startX = event.pageX
    let startY = event.pageY

    const drag = (event) => {
      event.preventDefault()

      pane.style.left = l + (event.pageX - startX) + 'px'
      pane.style.top = t + (event.pageY - startY) + 'px'
    }

    const mouseup = () => {
      pane.classList.remove('is-dragging')

      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', mouseup)
  })

  corner.addEventListener('mousedown', (event) => {
    let w = pane.clientWidth
    let h = pane.clientHeight

    let startX = event.pageX
    let startY = event.pageY

    const drag = (event) => {
      event.preventDefault()

      pane.style.width = w + (event.pageX - startX) + 'px'
      pane.style.height = h + (event.pageY - startY) + 'px'
    }

    const mouseup = () => {
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', mouseup)
  })
})

// Function to toggle the visibility of a pane
function togglePane(paneId) {
  const pane = document.getElementById(paneId);
  if (pane.style.display === "none" || pane.style.display === "") {
    pane.style.display = "block";
  } else {
    pane.style.display = "none";
  }
}

// Function to close a pane
function closePane(paneId) {
  const pane = document.getElementById(paneId);
  pane.style.display = "none";
}

// Function to toggle the visibility of the menu
function toggleMenu() {
  const menu = document.getElementById('menu');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  const menu = document.getElementById('menu');
  const menuButton = document.querySelector('.menu-button');
  if (menu && !menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.style.display = 'none';
  }
});

// Function to update the clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock on page load
updateClock();
