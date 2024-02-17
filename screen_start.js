let fadeIn = true;

function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (fadeIn) {
        ctx.globalAlpha += 0.02; // Ajuste conforme necessário para controlar a velocidade do fade in
        if (ctx.globalAlpha >= 1) {
            fadeIn = false;
            setTimeout(() => {
                fadeIn = true;
            }, 3000); // Espera 3 segundos e inicia o fade in novamente
        }
    } else {
        ctx.globalAlpha -= 0.02; // Ajuste conforme necessário para controlar a velocidade do fade out
        if (ctx.globalAlpha <= 0.05) {
            fadeIn = true;
            setTimeout(() => {
                fadeIn = false;
            }, 3000); // Espera 3 segundos e inicia o fade out novamente
        }
    }

    ctx.fillStyle = '#FFF'; // Cor do texto
    ctx.font = '20px Arial'; // Estilo da fonte
    ctx.fillText(`PRESS ENTER TO START`, canvas.width - canvas.width / 2 - 100, 350);
}

function drawStartScreen() {
    setInterval(drawText(), 40);
}

document.addEventListener('keydown', e => {
    if (current_screen === 'START') {
        switch (e.key) {
            case 'Enter':
                ctx.globalAlpha = 1;
                current_screen = 'RUN_GAME';
                break;
        }
    }
});
