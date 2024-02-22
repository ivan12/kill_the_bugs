function drawPlayer() {
    // draw player
    spritePlayer.draw(player.x, player.y, player.direction, player.speed);

    if (debug) {
        ctx.strokeStyle = '#0000FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    // Desenha o texto de pontuação
    ctx.fillStyle = '#000';
    ctx.font = '40px';
    ctx.fillText(`${boss ? '' : player.points}`, player.x - 8, player.y - player.radius - 5, 40);
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

function isPlayerInsideSafeZone() {
    const dx = player.x - safeZone.x;
    const dy = player.y - safeZone.y;
    const distanceToSafeZone = Math.sqrt(dx * dx + dy * dy);
    return distanceToSafeZone <= safeZone.radius;
}

function killEnemiesInsideSafeZone() {
    enemies = enemies.filter(enemy => {
        /* if inside remove points and remove enemy */
        if (!isEnemyOutsideSafeZone(enemy)) {
            /* if enemy more strong than safeZone */
            if (enemy.points > safeZone.teamPoints) {
                enemy.points -= safeZone.teamPoints;
                safeZone.teamPoints -= enemy.points;
                return true;
            }

            // Check if there are enemies with higher priority before killing
            if (!verifyIfHaveAnotherEnemyMorePriority(enemy)) {
                safeZone.teamPoints -= enemy.points;
                return false; // Remove the enemy only if no higher priority enemies are present
            } else {
                console.log('priorityDenied!!! enemy >> ', enemy);
                priorityDenied = true;
            }
        }

        return true;
    });

    return enemies;
}

function updatePlayer() {
    isPlayerInSafezone = false;

    if (player.health <= 0) {
        current_screen = 'GAME_OVER';
        return;
    }

    // Ensure player stays within canvas boundaries
    player.x = Math.max(0, Math.min(player.x, canvas.width));
    player.y = Math.max(0, Math.min(player.y, canvas.height));

    if (isPlayerInsideSafeZone()) {
        if (!recoveryTimeout) recoverLife();
        killEnemiesInsideSafeZone();
        isPlayerInSafezone = true;
    }

    // Check for collision with enemies
    enemies = enemies.filter(enemy => {
        clearInterval(damageInterval);

        canvas.style.filter = 'blur(0)';

        if (enemyHasCollisionWithPlayer(enemy)) {
            // Damage the player immediately
            if (canTakeDamage) {
                player.health -= 10;
                // Apply blur effect temporarily
                canvas.style.filter = 'blur(3px) brightness(1.3)';
                setTimeout(() => {
                    canvas.style.filter = 'blur(0)';
                }, 200);
            }

            if (enemy.points <= player.points) {
                player.points -= enemy.points;
                console.log('KILL ENEMY');
                return false;
            }

            // Set a flag to prevent immediate further damage
            canTakeDamage = false;

            // Allow player to take damage after 1 second
            takeDamageTimeout = setTimeout(() => {
                canTakeDamage = true;
            }, 1000);

            // Schedule damage every second
            damageInterval = setInterval(() => {
                if (enemyHasCollisionWithPlayer(enemy)) {
                    player.health -= 10;

                    // Apply blur effect temporarily
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
        return true;
    });
}
