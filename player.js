function drawPlayer() {
    const borderWidth = 3; // Ajuste conforme necessário

    // draw player
    ctx.fillStyle = '#7B68EE';
    ctx.fillRect(
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
    );

    // Desenha o contorno da barra de vida
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
    );

    // Desenha o texto de pontuação
    ctx.fillStyle = '#000';
    ctx.font = '40px';
    ctx.fillText(
        `${boss ? '' : player.points}`,
        player.x - player.width / 2 + 8,
        player.y + player.height / 3,
        40
    );
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

            /* if enemy more strong than safeZone */
            if (enemy.points > safeZone.teamPoints) {
                enemy.points -= safeZone.teamPoints;
                safeZone.teamPoints -= enemy.points;
                return;
            }

            /* if inside remove points and remove enemy */
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
