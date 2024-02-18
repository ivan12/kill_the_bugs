function drawPlayer() {
    let playerHeight = player.height * (player.health / 100);
    ctx.fillStyle = '#00F';
    ctx.fillRect(
        player.x - player.width / 2,
        player.y - player.height / 2 + (player.height - playerHeight),
        player.width,
        playerHeight
    );
    ctx.rect(
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
    );
    ctx.fillStyle = '#000';
    ctx.font = '40px';
    ctx.fillText(
        `${boss ? '' : player.points}`,
        player.x - player.width / 2 + 8,
        player.y + player.height / 3,
        40
    );
    ctx.stroke();
}

function updatePlayer() {
    if (player.health <= 0) {
        current_screen = 'GAME_OVER';
        return;
    }

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width) player.x = canvas.width;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height) player.y = canvas.height;

    // Verify if player is in safeZone
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );
    if (distanceToSafeZone < safeZone.radius) {
        // Recover life
        setTimeout(() => {
            canRecoverLife = true;
        }, 2000);

        if (player.health < 100 && canRecoverLife) {
            canRecoverLife = false;
            player.health += 5;
        }

        // Kill enemies inside the Safe Zone
        let isEnemyOutside = true;
        enemies = enemies.filter(enemy => {
            const distanceToEnemy = Math.sqrt(
                (enemy.x - safeZone.x) ** 2 + (enemy.y - safeZone.y) ** 2
            );
            isEnemyOutside = distanceToEnemy > safeZone.radius + enemy.width / 2;
            if (!isEnemyOutside) {
                safeZone.teamPoints -= enemy.points;
            }

            return isEnemyOutside;
        });
    }

    // Verify if enemies collided to the player
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.width / 2 + enemy.width / 2 && canTakeDamage) {
            // damage player anemy
            player.health -= 10;
            canTakeDamage = false;

            // blur effect
            canvas.style.filter = 'blur(5px) brightness(2)';

            if (enemy.points <= player.points) {
                player.points = player.points - enemy.points;
                enemies = enemies.filter(enemyParam => enemyParam !== enemy);
            }

            setTimeout(() => {
                // Remove blur after 0.5 seconds
                canvas.style.filter = 'blur(0)';
            }, 500);

            // Allow player take damage after 2 seconds
            setTimeout(() => {
                canTakeDamage = true;
            }, 1000);
        }
    });
}
