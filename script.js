const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 5,
    dx: 0,
    dy: 0
};

const trash = [];

function addTrash() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 10;
    trash.push({ x, y, size });
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function drawTrash() {
    trash.forEach(item => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
        ctx.fillStyle = 'brown';
        ctx.fill();
        ctx.closePath();
    });
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Collision with walls
    if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size;
    }
    if (player.x - player.size < 0) {
        player.x = player.size;
    }
    if (player.y + player.size > canvas.height) {
        player.y = canvas.height - player.size;
    }
    if (player.y - player.size < 0) {
        player.y = player.size;
    }

    // Collecting trash
    for (let i = 0; i < trash.length; i++) {
        const dist = Math.hypot(player.x - trash[i].x, player.y - trash[i].y);
        if (dist < player.size + trash[i].size) {
            trash.splice(i, 1);
            addTrash();
            break;
        }
    }
}

function update() {
    clear();
    drawPlayer();
    drawTrash();
    movePlayer();

    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        player.dy = player.speed;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || 
        e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = 0;
    } else if (e.key === 'ArrowUp' || e.key === 'Up' || 
               e.key === 'ArrowDown' || e.key === 'Down') {
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

addTrash();
update();