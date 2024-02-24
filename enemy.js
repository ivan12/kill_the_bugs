function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.isAlive) {
        /* draw with priority >> choose sprite color */
        listSpritesEnemies[enemy.priority].draw(enemy.x, enemy.y, enemy.direction, enemy.speed);

        if (debug) {
            drawVisionRadius(enemy);
            ctx.strokeStyle = '#0000FF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }

        if (canSeePlayer(enemy)) {
            const pointsEnemyText = `${boss ? '' : enemy.points}`;
            const textWidth = ctx.measureText(pointsEnemyText).width;

            ctx.fillStyle = '#1C1B1B';
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y - enemy.radius - 20, textWidth / 2 + 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = '#EFEDED';
            ctx.font = '18px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(pointsEnemyText, enemy.x, enemy.y - enemy.radius - 20);
        }
    }
    });
}

function drawVisionRadius(enemy) {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 150, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.stroke();
    ctx.closePath();
}

function updateEnemies() {
    /* Remove enemies dead */
    enemies = enemies.filter(enemy => enemy.isAlive === true);

    /* Update enemies */
    enemies.forEach(enemy => {
        if (enemy.isAlive) {
            moveEnemyAI(enemy);
            // avoid the canvas borders
            moveEnemyAIAwayFromEdge(enemy);
        }
        
    });
}

function spawnEnemy() {
    const angle = Math.random() * 2 * Math.PI;
    const priority = getPriority();
    const enemy = {
        action: '',
        direction: 'right',
        directionX: Math.cos(angle),
        directionY: Math.sin(angle),
        height: 20,
        isAlive: true,
        points: getRandomFibonacciNumber(),
        priority: priority,
        radius: 19,
        speed: priority === 0 ? 1 : priority,
        width: 20,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
    };
    enemies.push(enemy);
}
