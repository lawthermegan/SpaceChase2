let isGameOver = false;
const container = document.getElementById('game-container');
const ufo = document.getElementById('ufo');
const alien = document.getElementById('alien');
const explosion = document.getElementById('explosion');
const gameOverScreen = document.getElementById('game-over');

// Start the warp effect on load
container.classList.add('warping');

function updatePosition(x, y) {
    if (isGameOver) return;
    ufo.style.left = (x - 30) + 'px';
    ufo.style.top = (y - 30) + 'px';
    checkCollision();
}

window.addEventListener('mousemove', (e) => updatePosition(e.pageX, e.pageY));
window.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    updatePosition(touch.pageX, touch.pageY);
    e.preventDefault();
}, { passive: false });

function moveAlien() {
    if (isGameOver) return;
    const x = Math.random() * (window.innerWidth - 80);
    const y = Math.random() * (window.innerHeight - 80);
    alien.style.left = x + 'px';
    alien.style.top = y + 'px';
}

setInterval(moveAlien, 800);

function checkCollision() {
    const ufoRect = ufo.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();

    if (!(ufoRect.right < alienRect.left || 
          ufoRect.left > alienRect.right || 
          ufoRect.bottom < alienRect.top || 
          ufoRect.top > alienRect.bottom)) {
        triggerExplosion(ufoRect.left, ufoRect.top);
    }
}

function triggerExplosion(x, y) {
    isGameOver = true;
    container.classList.remove('warping'); // Stop warping on crash
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    explosion.style.display = 'block';
    
    alien.style.display = 'none';
    ufo.style.display = 'none';
    gameOverScreen.style.display = 'block';
}

function resetGame() {
    isGameOver = false;
    container.classList.add('warping'); // Restart warp
    gameOverScreen.style.display = 'none';
    explosion.style.display = 'none';
    alien.style.display = 'block';
    ufo.style.display = 'block';
    moveAlien();
}
