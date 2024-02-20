/* global vars need start in keyboard */
let miniMapOn = true;
let lightShadowOn = true;

document.addEventListener('keydown', e => {
    if (current_screen === 'RUN_GAME') {
        let newX = player.x;
        let newY = player.y;

        switch (e.key) {
            case 'w':
            case 'ArrowUp':
                newY -= player.speed;
                break;
            case 's':
            case 'ArrowDown':
                newY += player.speed;
                break;
            case 'a':
            case 'ArrowLeft':
                newX -= player.speed;
                break;
            case 'd':
            case 'ArrowRight':
                newX += player.speed;
                break;
            case 'm':
                miniMapOn = !miniMapOn;
                break;
            case 'l':
                lightShadowOn = !lightShadowOn
                break;
        }

        // Verifica se o novo posicionamento do jogador colide com algum inimigo
        let collisionDetected = false;
        enemies.forEach(enemy => {
            const dx = newX - enemy.x;
            const dy = newY - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.width / 2 + enemy.width / 2) {
                collisionDetected = true;
            }
        });

        // Se não houver colisão, atualiza a posição do jogador
        if (!collisionDetected) {
            player.x = newX;
            player.y = newY;
        }
    }

    if (current_screen === 'RUN_GAME' || current_screen === 'PAUSE') {
        switch (e.key) {
            case 'Escape':
                current_screen = 'PAUSE';
                break;
            case 'Enter':
                current_screen = 'RUN_GAME';
                break;
        }
    }

    if (current_screen === 'START') {
        switch (e.key) {
            case 'Enter':
                ctx.globalAlpha = 1;
                current_screen = 'RUN_GAME';
                break;
        }
    }

    if (current_screen === 'GAME_OVER') {
        switch (e.key) {
            case 'Enter':
                clearGameVars();
                current_screen = 'RUN_GAME';
                break;
            case 'Escape':
                clearGameVars();
                current_screen = 'START';
                break;
        }
    }
});
