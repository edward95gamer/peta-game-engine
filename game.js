window.onload = function() {
    alert('Welcome to the Simple Game!the zombie is an abuser infector you need to kill him before the world is entire of abusers.move the player to the zombie to kill him');
};

const player = document.getElementById('player');
const enemy = document.querySelector('.enemy');
const gameContainer = document.getElementById('game-container');
const controlsContainer = document.getElementById('controls-container');

let playerX = 0;
let playerY = 0;

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    const speed = 10;
    switch (event.key) {
        case 'w':
            playerY -= speed;
            break;
        case 'a':
            playerX -= speed;
            break;
        case 's':
            playerY += speed;
            break;
        case 'd':
            playerX += speed;
            break;
    }

    player.style.transform = `translate(${playerX}px, ${playerY}px)`;

    // Check for collision with the enemy
    if (checkCollision(player, enemy)) {
        showWinScreen();
    }
}

function moveEnemy() {
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;

    const enemyX = Math.random() * maxX;
    const enemyY = Math.random() * maxY;

    enemy.style.transform = `translate(${enemyX}px, ${enemyY}px)`;
}

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function showWinScreen() {
    const winMessage = document.createElement('div');
    winMessage.innerText = 'You Win!';
    winMessage.style.position = 'absolute';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    winMessage.style.fontSize = '2em';
    winMessage.style.color = 'green';

    gameContainer.appendChild(winMessage);

    // Move enemy to the center of the screen
    enemy.style.transform = 'translate(50%, 50%)';

    // Stop listening for further key events
    document.removeEventListener('keydown', handleKeyDown);
}

setInterval(moveEnemy, 2000); // Move enemy every 2 seconds

// Detect touch screen and show controls
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    controlsContainer.style.display = 'flex';

    const btnUp = document.getElementById('btn-up');
    const btnLeft = document.getElementById('btn-left');
    const btnDown = document.getElementById('btn-down');
    const btnRight = document.getElementById('btn-right');

    btnUp.addEventListener('click', () => {
        playerY -= 10;
        player.style.transform = `translate(${playerX}px, ${playerY}px)`;
    });

    btnLeft.addEventListener('click', () => {
        playerX -= 10;
        player.style.transform = `translate(${playerX}px, ${playerY}px)`;
    });

    btnDown.addEventListener('click', () => {
        playerY += 10;
        player.style.transform = `translate(${playerX}px, ${playerY}px)`;
    });

    btnRight.addEventListener('click', () => {
        playerX += 10;
        player.style.transform = `translate(${playerX}px, ${playerY}px)`;
    });
}
