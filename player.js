function drawPlayer() {
    ctx.stroke();
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

    // Verificar se o jogador está dentro da Safe Zone
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );
    if (distanceToSafeZone < safeZone.radius) {
        // Recupe vida
        setTimeout(() => {
            canRecoverLife = true;
        }, 2000);

        if (player.health < 100 && canRecoverLife) {
            canRecoverLife = false;
            player.health += 5;
        }

        // Eliminar inimigos dentro da Safe Zone
        enemies = enemies.filter(enemy => {
            const distanceToEnemy = Math.sqrt(
                (enemy.x - safeZone.x) ** 2 + (enemy.y - safeZone.y) ** 2
            );
            return distanceToEnemy > safeZone.radius + enemy.width / 2;
        });
    }

    // Verificar colisão com inimigos
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.width / 2 + enemy.width / 2 && canTakeDamage) {
            // Tocou no jogador, causar dano
            player.health -= 10; // Ajuste a quantidade de dano conforme necessário
            canTakeDamage = false;

            // Aplicar blur vermelho na tela
            canvas.style.filter = 'blur(5px) brightness(2)';

            setTimeout(() => {
                // Remover o blur após 0.5 segundos
                canvas.style.filter = 'blur(0)';
            }, 500);

            // Permitir que o jogador receba dano novamente após 2 segundos
            setTimeout(() => {
                canTakeDamage = true;
            }, 1000);
        }
    });
}
