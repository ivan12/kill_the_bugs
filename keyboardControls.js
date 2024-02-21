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
                player.direction = 'up';
                player.isMoving = true;
                break;
            case 's':
            case 'ArrowDown':
                newY += player.speed;
                player.direction = 'down';
                player.isMoving = true;
                break;
            case 'a':
            case 'ArrowLeft':
                newX -= player.speed;
                player.direction = 'left';
                player.isMoving = true;
                break;
            case 'd':
            case 'ArrowRight':
                newX += player.speed;
                player.direction = 'right';
                player.isMoving = true;
                break;
            case 'm':
                miniMapOn = !miniMapOn;
                break;
            case 'l':
                lightShadowOn = !lightShadowOn;
                break;
            case 'i':
                debug = !debug;
                break;
        }

        // Se não houver colisão, atualiza a posição do jogador
        if (isCollisionFree(newX, newY, player.spriteWidth, player.spriteHeight)) {
            // Se não houver colisão, atualiza a posição do jogador
            player.x = newX;
            player.y = newY;
        } else {
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

document.addEventListener('keyup', e => {
    if (current_screen === 'RUN_GAME') {
        switch (e.key) {
            case 'w':
            case 'ArrowUp':
            case 's':
            case 'ArrowDown':
            case 'a':
            case 'ArrowLeft':
            case 'd':
            case 'ArrowRight':
                player.isMoving = false;
                break;
        }
    }
});
