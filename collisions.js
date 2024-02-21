function isCollisionFree(x, y, width, height) {
    // Check for collisions with enemies
    for (const enemy of enemies) {
        const collidesX = x < enemy.x + enemy.width && x + width > enemy.x;
        const collidesY = y < enemy.y + enemy.height && y + height > enemy.y;

        if (collidesX && collidesY) {
            return false; // Collision detected, not free
        }
    }

    // Check for collisions with other obstacles or boundaries if needed

    return true; // No collision detected, area is free
}

function enemyHasCollisionWithPlayer(enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

    if (distanceToPlayer > 0.4) {
        const moveX = (dx / distanceToPlayer) * player.speed;
        const moveY = (dy / distanceToPlayer) * player.speed;

        const nextX = enemy.x + moveX;
        const nextY = enemy.y + moveY;
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;

        const collidesX = nextX < player.x + player.width && nextX + enemy.width > player.x;
        const collidesY = nextY < player.y + player.height && nextY + enemy.height > player.y;

        const distance = Math.sqrt(
            (playerCenterX - (nextX + enemy.width / 2)) ** 2 +
                (playerCenterY - (nextY + enemy.height / 2)) ** 2
        );

        const minCollisionDistance = (player.width + enemy.width) / 2;

        return collidesX && collidesY && distance < minCollisionDistance;
    }
}

function enemyHasCollisionWithEnemies(x, y, enemy) {
    // Check for collisions with other enemies
    return enemies.some(otherEnemy => {
        if (otherEnemy !== enemy) {
            const collidesX =
                enemy.x < otherEnemy.x + otherEnemy.width && x + enemy.width > otherEnemy.x;
            const collidesY =
                enemy.y < otherEnemy.y + otherEnemy.height && y + enemy.height > otherEnemy.y;

            return collidesX && collidesY;
        }
        return false;
    });
}
