function isCollisionFree(x, y, width, height) {
    // Check for collisions with enemies
    for (const enemy of enemies) {
        const radiusSum = enemy.radius + Math.max(width, height) / 2;
        const distance = Math.sqrt((x - enemy.x) ** 2 + (y - enemy.y) ** 2);

        if (distance < radiusSum) {
            return false; // Collision detected, not free
        }
    }
    return true; // No collision detected, area is free
}

function enemyHasCollisionWithPlayer(enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distanceToPlayer = Math.sqrt(dx ** 2 + dy ** 2);

    const minCollisionDistance = player.radius + enemy.radius;

    return distanceToPlayer < minCollisionDistance;
}

function enemyHasCollisionWithEnemies(x, y, enemy) {
    // Check for collisions with other enemies
    return enemies.some(otherEnemy => {
        if (otherEnemy !== enemy) {
            const radiusSum = enemy.radius + otherEnemy.radius;
            const distance = Math.sqrt((x - otherEnemy.x) ** 2 + (y - otherEnemy.y) ** 2);

            return distance < radiusSum;
        }
        return false;
    });
}

function isEnemyOutsideSafeZone(enemy) {
    const distanceToSafeZone = Math.sqrt((enemy.x - safeZone.x) ** 2 + (enemy.y - safeZone.y) ** 2);

    return distanceToSafeZone > safeZone.radius + enemy.radius;
}

function isPlayerInsideSafeZone() {
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );

    return distanceToSafeZone <= safeZone.radius + player.radius;
}
