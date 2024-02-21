function drawPlayer() {
    // draw player
    spritePlayer.draw(player.x, player.y, player.direction, player.speed);

    if (debug) {
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        const collisionRectWidth = player.width;
        const collisionRectHeight = player.height;
        const collisionRectX = playerCenterX - collisionRectWidth / 2;
        const collisionRectY = playerCenterY - collisionRectHeight / 2;

        ctx.strokeStyle = '#0000FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(collisionRectX, collisionRectY, collisionRectWidth, collisionRectHeight);
        ctx.stroke();
        ctx.closePath();
    }

    // Desenha o texto de pontuação
    ctx.fillStyle = '#000';
    ctx.font = '40px';
    ctx.fillText(`${boss ? '' : player.points}`, player.x + 23, player.y, 40);
}

let recoveryTimeout;

function recoverLife() {
    if (player.health < 100) {
        player.health = Math.min(100, player.health + 5);

        if (!recoveryTimeout) {
            recoveryTimeout = setTimeout(() => {
                recoveryTimeout = null;
            }, 2000);
        }
    }
}

function verifyIfHaveAnotherEnemyMorePriority(enemy) {
    return enemies.some(enemyParam => enemyParam !== enemy && enemyParam.priority > enemy.priority);
}

function killEnemiesInsideSafeZone() {
    enemies = enemies.filter(enemy => {
        const distanceToEnemy = Math.sqrt(
            (enemy.x - safeZone.x) ** 2 + (enemy.y - safeZone.y) ** 2
        );

        /* if inside remove points and remove enemy */
        const isEnemyOutside = distanceToEnemy > safeZone.radius + enemy.width / 2;
        if (!isEnemyOutside) {
            /* if enemy more strong than safeZone */
            if (enemy.points > safeZone.teamPoints) {
                enemy.points -= safeZone.teamPoints;
                safeZone.teamPoints -= enemy.points;
                return true;
            }

            // Check if there are enemies with higher priority before killing
            if (!verifyIfHaveAnotherEnemyMorePriority(enemy, enemies)) {
                safeZone.teamPoints -= enemy.points;
                return false; // Remove the enemy only if no higher priority enemies are present
            } else {
                priorityDenied = true;
            }
        }

        return true;
    });

    return enemies;
}

function updatePlayer() {
    if (player.health <= 0) {
        current_screen = 'GAME_OVER';
        return;
    }

    // Ensure player stays within canvas boundaries
    player.x = Math.max(0, Math.min(player.x, canvas.width));
    player.y = Math.max(0, Math.min(player.y, canvas.height));

    // Check if player is in the safe zone
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );

    if (distanceToSafeZone < safeZone.radius && !recoveryTimeout) {
        recoverLife();
        killEnemiesInsideSafeZone();
    }

    // Check for collision with enemies
    enemies.forEach(enemy => {
        if (enemyHasCollisionWithPlayer(enemy) && canTakeDamage) {
            clearInterval(damageInterval);

            // Damage the player immediately
            player.health -= 10;

            // Apply blur effect
            canvas.style.filter = 'blur(3px) brightness(1.3)';

            setTimeout(() => {
                canvas.style.filter = 'blur(0)';
            }, 200);

            // Set a flag to prevent immediate further damage
            canTakeDamage = false;

            // Allow player to take damage after 1 second
            setTimeout(() => {
                canTakeDamage = true;
            }, 1000);

            // Schedule damage every second
            damageInterval = setInterval(() => {
                if (enemyHasCollisionWithPlayer(enemy)) {
                    player.health -= 10;

                    // Apply blur effect
                    canvas.style.filter = 'blur(5px) brightness(2)';
                    setTimeout(() => {
                        canvas.style.filter = 'blur(0)';
                    }, 200);

                    // Allow player to take damage after 1 second
                    setTimeout(() => {
                        canTakeDamage = true;
                    }, 1000);
                }
            }, 1000);
        }
    });
}
